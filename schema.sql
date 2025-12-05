-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
CREATE EXTENSION IF NOT EXISTS "cube";
CREATE EXTENSION IF NOT EXISTS "earthdistance";

-- ENUMS
CREATE TYPE part_condition AS ENUM ('new', 'excellent', 'good', 'fair', 'poor', 'for_parts');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'sold', 'paused', 'deleted', 'flagged');
CREATE TYPE offer_status AS ENUM ('pending', 'accepted', 'rejected', 'countered', 'withdrawn');
CREATE TYPE shipping_method AS ENUM ('local_pickup_only', 'buyer_pays_shipping', 'free_shipping', 'shipping_included');
CREATE TYPE transaction_type AS ENUM ('buy_now', 'auction', 'make_offer');

-- 1. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  rating NUMERIC(3,2) DEFAULT 5.0,
  total_sales INT DEFAULT 0,
  total_purchases INT DEFAULT 0,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Brands & Categories
CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  sort_order INT DEFAULT 0
);

-- 3. Parts
CREATE TABLE IF NOT EXISTS parts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id INT REFERENCES categories(id) ON DELETE RESTRICT,
  brand_id INT REFERENCES brands(id),
  model TEXT NOT NULL,
  release_year INT,
  msrp NUMERIC(10,2),
  search_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-fill search_text
CREATE OR REPLACE FUNCTION update_parts_search_text()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_text := 
    COALESCE(NEW.model, '') || ' ' ||
    COALESCE((SELECT name FROM brands b WHERE b.id = NEW.brand_id), '');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trig_parts_search ON parts;
CREATE TRIGGER trig_parts_search
  BEFORE INSERT OR UPDATE ON parts
  FOR EACH ROW EXECUTE FUNCTION update_parts_search_text();

-- Spec tables
CREATE TABLE IF NOT EXISTS gpu_specs (      part_id UUID PRIMARY KEY REFERENCES parts(id) ON DELETE CASCADE, architecture TEXT, memory_gb INT, memory_type TEXT, core_clock_mhz INT, boost_clock_mhz INT, tdp INT, length_mm INT, ports TEXT[], cooling TEXT);
CREATE TABLE IF NOT EXISTS cpu_specs (      part_id UUID PRIMARY KEY REFERENCES parts(id) ON DELETE CASCADE, socket TEXT NOT NULL, cores INT, threads INT, base_clock_ghz NUMERIC(4,2), boost_clock_ghz NUMERIC(4,2), integrated_graphics BOOLEAN DEFAULT FALSE, tdp INT);
CREATE TABLE IF NOT EXISTS motherboard_specs(part_id UUID PRIMARY KEY REFERENCES parts(id) ON DELETE CASCADE, socket TEXT NOT NULL, chipset TEXT, form_factor TEXT, memory_type TEXT CHECK (memory_type IN ('DDR3','DDR4','DDR5')), memory_slots INT, max_memory_gb INT, m2_slots INT);
CREATE TABLE IF NOT EXISTS ram_specs (      part_id UUID PRIMARY KEY REFERENCES parts(id) ON DELETE CASCADE, type TEXT NOT NULL CHECK (type IN ('DDR3','DDR4','DDR5','LPDDR5')), speed_mhz INT, capacity_gb INT, modules INT DEFAULT 1, rgb BOOLEAN DEFAULT FALSE);
CREATE TABLE IF NOT EXISTS storage_specs (  part_id UUID PRIMARY KEY REFERENCES parts(id) ON DELETE CASCADE, drive_type TEXT CHECK (drive_type IN ('SSD', 'HDD', 'NVMe')), interface TEXT, capacity_gb BIGINT, form_factor TEXT);

-- 4. Listings
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES auth.users NOT NULL,
  part_id UUID REFERENCES parts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  condition part_condition NOT NULL,
  transaction_type transaction_type DEFAULT 'buy_now',
  auction_ends_at TIMESTAMPTZ,
  shipping_method shipping_method DEFAULT 'local_pickup_only',
  shipping_cost NUMERIC(8,2) DEFAULT 0,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  city TEXT,
  state TEXT,
  status listing_status DEFAULT 'active',
  views INT DEFAULT 0,
  watchers INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  sold_at TIMESTAMPTZ
);

-- Rest of tables
CREATE TABLE IF NOT EXISTS listing_images ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), listing_id UUID REFERENCES listings(id) ON DELETE CASCADE, url TEXT NOT NULL, sort_order INT DEFAULT 0, is_cover BOOLEAN DEFAULT FALSE);
CREATE TABLE IF NOT EXISTS offers (         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), listing_id UUID REFERENCES listings(id) ON DELETE CASCADE, buyer_id UUID REFERENCES auth.users NOT NULL, amount NUMERIC(10,2) NOT NULL, message TEXT, status offer_status DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS conversations ( id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), listing_id UUID REFERENCES listings(id) ON DELETE CASCADE, buyer_id UUID REFERENCES auth.users, seller_id UUID REFERENCES auth.users, last_message_at TIMESTAMPTZ DEFAULT NOW(), last_message_preview TEXT);
CREATE TABLE IF NOT EXISTS messages (       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE, sender_id UUID REFERENCES auth.users NOT NULL, content TEXT NOT NULL, is_read BOOLEAN DEFAULT FALSE, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS watchlist (      user_id UUID REFERENCES auth.users ON DELETE CASCADE, listing_id UUID REFERENCES listings(id) ON DELETE CASCADE, created_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY (user_id, listing_id));
CREATE TABLE IF NOT EXISTS reviews (        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), listing_id UUID REFERENCES listings(id), reviewer_id UUID REFERENCES auth.users, seller_id UUID REFERENCES auth.users, rating INT CHECK (rating >= 1 AND rating <= 5), comment TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_parts_search      ON parts USING GIN (to_tsvector('english', search_text));
CREATE INDEX IF NOT EXISTS idx_listings_active   ON listings(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_listings_price     ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_created  ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings USING GIST (ll_to_earth(location_lat, location_lng));
CREATE INDEX IF NOT EXISTS idx_listings_search   ON listings USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View active listings" ON listings FOR SELECT USING (status IN ('active', 'sold'));
CREATE POLICY "Sellers manage own listings" ON listings FOR ALL USING (auth.uid() = seller_id) WITH CHECK (auth.uid() = seller_id);

ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Images public" ON listing_images FOR SELECT USING (true);
CREATE POLICY "Seller manages images" ON listing_images FOR ALL USING (EXISTS (SELECT 1 FROM listings l WHERE l.id = listing_id AND l.seller_id = auth.uid()));

ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own watchlist" ON watchlist FOR ALL USING (auth.uid() = user_id);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own conversations" ON conversations FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own messages" ON messages FOR ALL USING (
  EXISTS (SELECT 1 FROM conversations c WHERE c.id = conversation_id AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid()))
);

-- Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('listings', 'listings', true),
  ('avatars', 'avatars', true)
ON CONFLICT DO NOTHING;

-- Storage Policies
create policy "Public listing images" on storage.objects for select 
  using (bucket_id = 'listings');

create policy "User avatar upload" on storage.objects for insert 
  with check (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Sample Data
INSERT INTO brands (name, slug) VALUES ('NVIDIA', 'nvidia'), ('AMD', 'amd'), ('Intel', 'intel') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, slug) VALUES ('GPU', 'gpu'), ('CPU', 'cpu'), ('Motherboard', 'motherboard') ON CONFLICT DO NOTHING;
