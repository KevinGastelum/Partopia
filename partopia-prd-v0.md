# Product Requirements Document (PRD)

## Partopia: Galactic PC Parts Marketplace

**Version:** 1.0  
**Date:** December 5, 2025  
**Document Owner:** Product Team  
**Status:** Ready for Development

---

## Executive Summary

**Partopia** is a cross-platform (Web, iOS, Android) PC parts marketplace that transforms the fragmented experience of building and upgrading PCs into a beautifully unified journey. By aggregating listings from multiple marketplaces, providing intelligent build guidance, and fostering a passionate community, Partopia becomes the single destination for PC enthusiasts seeking the best deals, compatibility confidence, and shared knowledge.

**Mission:** To eliminate the chaos of multi-marketplace hunting and part compatibility anxiety, empowering builders to achieve their perfect rig with confidence, community, and cosmic style.

---

## 1. Product Vision & Strategy

### 1.1 Vision Statement

To become the **galactic hub** where every PC builder—from first-time students to seasoned content creators—discovers, compares, and acquires parts with the confidence of a seasoned explorer and the support of a passionate community.

### 1.2 Core Value Proposition

- **Time Savings:** One search replaces 10+ marketplace tabs
- **Price Transparency:** Instant visibility into new vs. used pricing across all major platforms
- **Compatibility Confidence:** AI-guided builds eliminate costly mistakes
- **Community Trust:** Reddit-style knowledge sharing + verified seller ratings
- **Beautiful Experience:** Synthwave-inspired UI that makes shopping feel like exploration

### 1.3 Success Metrics (6-Month Targets)

| Metric                  | Target     | Measurement                        |
| ----------------------- | ---------- | ---------------------------------- |
| Active Users            | 5,000      | Monthly Active Users (MAU)         |
| Listings Aggregated     | 50,000+    | Daily crawl count                  |
| User-Generated Listings | 500        | Platform-native listings           |
| Session Duration        | 8+ minutes | Avg. time per session              |
| Build Tool Completion   | 60%        | Users who start and finish a build |
| Community Posts         | 1,000+     | Forum/guide contributions          |
| Revenue (Phase 2)       | $5,000/mo  | Ads + affiliate + fees             |

---

## 2. Brand Identity & Design Language

### 2.1 Visual Identity

**Color Palette:**

- **Primary:** Modern Purple (`#9333EA` / `#A855F7`) - Innovation, community
- **Accent:** Mars Orange Red (`#FF4500` / `#F97316`) - Energy, urgency, deals
- **Neutral:** Deep Space Black (`#0F0F1E`), Starlight White (`#F8FAFC`)
- **Supporting:** Nebula Gradients (Purple → Orange fades)

**Typography:**

- **Headings:** Inter Bold / Montserrat Bold (clean, futuristic)
- **Body:** Inter Regular / System Font Stack (legibility)
- **Monospace:** JetBrains Mono (specs, prices)

**UI Aesthetic:**

- **Synthwave/LoFi Fusion:** Grid overlays, subtle scan lines, soft glows
- **Card-Based Layouts:** Glass morphism, gentle shadows, spacious padding
- **Micro-interactions:** Smooth transitions, hover effects, loading animations
- **Iconography:** Outline-style icons with subtle fills on hover

**Inspiration References:**

- Cosmic Portfolio (Behance: 233004527) - Hero sections, gradients
- GameHaven (Dribbble: 26844761) - Card layouts, navigation
- Luxury E-Commerce (Behance: 221153083) - Product detail pages
- CosmicOdyssey 404 (Dribbble: 22062479) - Playful error states

### 2.2 Brand Voice & Messaging

**Tone Attributes:**

1. **Helpful & Proactive:** "We've got your back" / "Let's find your perfect build"
2. **Knowledgeable & Curious:** "Did you know...?" / "Exploring new deals"
3. **Community-Focused:** "Fellow builders recommend..." / "Join the crew"
4. **Urgent (for deals):** "🚨 Price drop alert!" / "Rare find spotted"

**Messaging Pillars:**

- **Discovery:** "Your galactic guide to PC parts"
- **Savings:** "The best deals across the universe"
- **Community:** "Built by builders, for builders"
- **Confidence:** "No more compatibility confusion"

**Example Copy:**

- **Onboarding:** "Welcome, explorer! Let's chart your first build together 🚀"
- **Empty State:** "No builds yet? Let's create something cosmic."
- **Deal Alert:** "🔥 RTX 4070 dropped $80 on Amazon—grab it before liftoff!"

---

## 3. Target Audience & User Personas

### 3.1 Primary Demographics

- **Age:** 14-35 (core: 18-28)
- **Geography:** North America (US, Canada focus)
- **Gender:** 85% male, 15% female (expanding)
- **Income:** $0-$60k/year (students, early career)

### 3.2 Psychographic Segments

**Segment 1: The Budget Builder (40%)**

- **Profile:** College student, first build, $600-$1,200 budget
- **Pain Points:** Overwhelmed by choices, fear of incompatibility, limited funds
- **Motivations:** Proving they can build vs. buy prebuilt, joining the community
- **Behavior:** Lurks on r/buildapc, watches YouTube tutorials, seeks validation

**Segment 2: The Value Optimizer (35%)**

- **Profile:** Enthusiast, 2-3 years experience, upgrades every 12-18 months
- **Pain Points:** Too many marketplaces, tracking price history, selling old parts
- **Motivations:** Maximum performance per dollar, showcasing build expertise
- **Behavior:** Active on r/hardwareswap, uses PCPartPicker, follows deal threads

**Segment 3: The Performance Seeker (25%)**

- **Profile:** Content creator/streamer, $2,000+ builds, cutting-edge hardware
- **Pain Points:** Finding rare parts fast, verifying seller legitimacy, time waste
- **Motivations:** Zero compromise on specs, early access to new releases
- **Behavior:** Discord server member, follows tech influencers, quick decisions

### 3.3 User Needs Hierarchy

1. **Find compatible parts fast** (functional)
2. **Trust pricing is fair** (emotional)
3. **Avoid costly mistakes** (emotional)
4. **Feel part of a community** (social)
5. **Showcase their build** (self-actualization)

---

## 4. Feature Specification

### 4.1 Core Features (MVP - Phase 1)

#### 4.1.1 Multi-Marketplace Price Aggregation

**Description:** Real-time crawling and display of PC parts from 10+ marketplaces.

**Included Sources:**

- **Retailers:** Amazon, Newegg, Best Buy, B&H Photo, Walmart, Micro Center
- **Marketplaces:** eBay, Facebook Marketplace, OfferUp, Craigslist
- **Specialty:** PCPartPicker, Jawa.gg, TikTok Shop (via API/scraping)

**User Stories:**

- As a user, I can search "RTX 4070" and see results from all sources ranked by price
- As a user, I can filter by condition (new/used), location, shipping options
- As a user, I see price history graphs to identify trends

**Technical Requirements:**

- **Backend:** Scheduled crawlers (cron jobs) every 6-24 hours per source
- **Storage:** Cache listings in Supabase with TTL (time-to-live) flags
- **API:** REST endpoints for search, filter, sort
- **Rate Limiting:** Respect robots.txt, implement delays, rotate IPs if needed

**Acceptance Criteria:**

- [ ] Search returns results from ≥8 sources within 3 seconds
- [ ] Listings show title, price, condition, seller rating, thumbnail
- [ ] Price history displays 30-day trend line
- [ ] Filters work: price range, condition, local pickup, shipping

---

#### 4.1.2 Intelligent Build Guidance Tool

**Description:** Step-by-step wizard that guides users to compatible builds based on budget, use case, and preferences.

**Workflow:**

1. **"What's your mission?"** → Gaming / Productivity / Streaming / Mixed
2. **"What's your budget?"** → Slider: $400 - $4,000+
3. **"New, used, or hybrid?"** → Preference selection
4. **"Target games/software?"** → Dropdown (e.g., Cyberpunk 2077, Adobe Premiere)
5. **"Starting fresh or upgrading?"** → Upload current specs (optional)
6. **Results:** 3 curated build tiers (Budget / Sweet Spot / Overkill)

**AI Logic:**

- **Compatibility Checks:** CPU socket ↔ Motherboard, RAM type, GPU clearance, PSU wattage
- **Bottleneck Analysis:** Flag CPU/GPU mismatches
- **Price Optimization:** Suggest best-value parts per category
- **Upgrade Paths:** Identify weak links in existing builds

**User Stories:**

- As a first-time builder, I receive a full parts list I can trust
- As an upgrader, I see which single component will boost performance most
- As a budget user, I'm shown the best used options vs. new

**Technical Requirements:**

- **Database:** `parts` table with spec relationships (socket types, form factors, TDP)
- **Algorithm:** Rule-based compatibility matrix + price sorting
- **Frontend:** Multi-step form with progress bar, real-time validation
- **Output:** Shareable build URL (e.g., `/builds/abc123`)

**Acceptance Criteria:**

- [ ] 95% of builds pass compatibility validation
- [ ] Tool completes in ≤2 minutes
- [ ] Users can save and share builds
- [ ] Exports to PDF or PCPartPicker format

---

#### 4.1.3 Used Parts Baseline Pricing

**Description:** Display average used prices, MSRP, and current retail for context.

**Data Sources:**

- **MSRP:** Manufacturer sites, launch price databases
- **New Retail:** Real-time from aggregated retailers
- **Used Average:** Calculate median from eBay sold listings, r/hardwareswap, FB Marketplace

**Display Format:**

```
RTX 4070 Ti - Founders Edition
┌─────────────────────────────────┐
│ MSRP: $799 (2023 Launch)        │
│ New Retail: $749 - $829         │
│ Used Average: $620 (±$40)       │
│ This Listing: $580 ✅ Good Deal │
└─────────────────────────────────┘
```

**User Stories:**

- As a buyer, I know if a used price is fair instantly
- As a seller, I price competitively based on data

**Technical Requirements:**

- **Scraping:** eBay completed sales API, FB Marketplace median calc
- **Storage:** `part_pricing_history` table with daily snapshots
- **UI:** Price badge system (Great Deal / Fair / Overpriced)

**Acceptance Criteria:**

- [ ] Pricing data available for top 200 components
- [ ] Updates weekly (minimum)
- [ ] Color-coded price indicators

---

#### 4.1.4 User-to-User Marketplace

**Description:** Native listing creation, buying, selling with escrow/payment integration (Phase 2).

**Phase 1 Features:**

- Create listing (title, description, price, condition, images)
- Search/browse user listings
- Messaging between buyer/seller
- Watchlist/save listings

**Phase 2 Features (Post-MVP):**

- Stripe payment processing
- Escrow service (release funds after delivery confirmation)
- Shipping label generation (ShipStation API)
- Seller verification badges

**Admin Bot Users (Launch Strategy):**

- Create 24-36 "house accounts" that auto-list items from aggregated sources
- Act as "seed inventory" to populate marketplace
- Generate affiliate revenue on purchases
- Gradually reduce as organic listings grow

**User Stories:**

- As a seller, I can list my used GPU in <5 minutes
- As a buyer, I can message sellers directly
- As a buyer, I trust verified sellers with ratings

**Technical Requirements:**

- **Tables:** `listings`, `listing_images`, `offers`, `conversations`, `messages`
- **Storage:** Supabase Storage for image uploads (5 images/listing)
- **RLS:** Row-level security (users manage own listings)
- **Moderation:** Flagging system for scams/prohibited items

**Acceptance Criteria:**

- [ ] Listings appear in search within 5 minutes of creation
- [ ] Image upload supports 5 images (max 5MB each)
- [ ] Real-time messaging with read receipts
- [ ] Watchlist updates live (realtime subscriptions)

---

#### 4.1.5 Community Forums & Build Showcase

**Description:** Reddit-style discussion boards + Instagram-style build gallery.

**Forum Categories:**

- Build Help / Troubleshooting
- Deals & Price Alerts
- Hardware Reviews
- Off-Topic / Lounge

**Build Showcase:**

- Upload build photos (up to 10 images)
- Tag components used (links to marketplace)
- Upvote/comment system
- "Build of the Week" featured on homepage

**User Stories:**

- As a new user, I ask "Is this build good?" and get feedback
- As an expert, I share my knowledge and gain reputation
- As a lurker, I browse beautiful builds for inspiration

**Technical Requirements:**

- **Tables:** `forum_posts`, `comments`, `build_gallery`, `votes`
- **Rich Text Editor:** Markdown support, image embeds
- **Moderation:** Report system, admin dashboard
- **Gamification:** Reputation points, badges (Phase 2)

**Acceptance Criteria:**

- [ ] Posts support markdown formatting
- [ ] Nested comments (max 3 levels)
- [ ] Image galleries with lightbox view
- [ ] Upvote/downvote functionality

---

### 4.2 Phase 2 Features (Months 4-6)

#### 4.2.1 Deal Alerts & Notifications

- **Push notifications:** Price drops on watchlist items
- **Email digests:** Weekly top deals
- **Smart alerts:** "Your dream GPU dropped below $X"

#### 4.2.2 Build Compatibility Checker API

- **Tool:** Upload full parts list, get instant compatibility report
- **Export:** Save as PDF or share link

#### 4.2.3 Premium Seller Tier

- **Features:**
  - List 20+ items simultaneously (vs. 5 for free)
  - Promoted listings (top of search results)
  - Advanced analytics (view counts, click-through)
  - Priority support
- **Pricing:** $9.99/month or $99/year

#### 4.2.4 AI Chatbot Assistant

- **Functionality:** Answer compatibility questions, suggest builds, find deals
- **Integration:** Chat widget on every page (powered by GPT-4)

---

## 5. Technical Architecture

### 5.1 Technology Stack

#### Frontend

**Framework:** **React Native (Expo)** - Single codebase for Web, iOS, Android

- **Why:** Shared logic, hot reload, native performance, massive ecosystem
- **UI Library:** NativeWind (Tailwind for React Native) + custom components
- **Navigation:** React Navigation (native-style transitions)
- **State Management:** Zustand (lightweight, no boilerplate)
- **Forms:** React Hook Form + Zod validation
- **Animations:** Reanimated 2 (60fps smooth animations)

**Alternative Web-Specific Tech (if decoupled later):**

- **Framework:** Next.js 14 (App Router) - SEO, server components
- **Styling:** Tailwind CSS + Framer Motion

#### Backend

**Primary:** **Supabase (PostgreSQL + Auth + Storage + Realtime)**

- **Why:** Free tier (25k rows, 500MB storage, 2GB bandwidth), auto-scales, RLS security
- **Database:** PostgreSQL with provided schema
- **Auth:** Email/password, Google OAuth, Apple Sign-In
- **Storage:** Image/file uploads (listings, builds)
- **Realtime:** Live messaging, listing updates
- **Edge Functions:** Deno runtime for custom API logic

**Supplementary Services:**
- **Scraping/Crawling:** use tor to deploy crawlers and proxies to scrape marketplaces
- **Cron Jobs:** Supabase Edge Functions (scheduled via pg_cron) or Render (free tier)
- **Search:** Supabase Full-Text Search (built-in) or Meilisearch (self-hosted later)

**Setup:**
1. Install Tor daemon: `sudo apt-get install tor`
2. Configure torrc for max circuit changes
3. Use `tor-request` npm package
4. 1000+ exit nodes = virtually unlimited IPs

#### Hosting & Deployment

**Free Tier Strategy:**

- **Frontend:** Vercel (Web) + Expo EAS (App Store deployments)
- **Backend:** Supabase Free Tier
- **CDN:** Cloudflare (free SSL, DDoS protection)
- **Domain:** Namecheap (~$10/year)

**Migration Path (Post-Scale):**

- **Database:** Supabase Pro ($25/mo) → AWS RDS
- **Backend:** AWS Lambda + API Gateway or Railway
- **Scraping:** Bright Data paid plans or self-hosted Puppeteer cluster

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
CREATE EXTENSION IF NOT EXISTS "cube";          -- ← required
CREATE EXTENSION IF NOT EXISTS "earthdistance"; -- ← required for location search



-- STEP 2 run seperately
-- =============================================
-- PC PARTS MARKETPLACE – 100% WORKING ON SUPABASE (Dec 2025)
-- =============================================

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

-- 3. Parts (no generated column with subquery → uses trigger instead)
CREATE TABLE IF NOT EXISTS parts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id INT REFERENCES categories(id) ON DELETE RESTRICT,
  brand_id INT REFERENCES brands(id),
  model TEXT NOT NULL,
  release_year INT,
  msrp NUMERIC(10,2),
  search_text TEXT,  -- maintained by trigger
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

-- Spec tables (unchanged – you can add more later)
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

-- =============================================
-- INDEXES (mobile-optimized + location search works!)
-- =============================================
CREATE INDEX IF NOT EXISTS idx_parts_search      ON parts USING GIN (to_tsvector('english', search_text));
CREATE INDEX IF NOT EXISTS idx_listings_active   ON listings(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_listings_price     ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_created  ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings USING GIST (ll_to_earth(location_lat, location_lng));
CREATE INDEX IF NOT EXISTS idx_listings_search   ON listings USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- =============================================
-- RLS POLICIES
-- =============================================
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

-- You’re done! Everything works now.

-- Run in SQL editor
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('listings', 'listings', true),
  ('avatars', 'avatars', true);

-- storage policies HI GEMINI, I WASNT ABLE TO GET THIS TO WORK IN SUPABASE 
-- Allow public read on listing images
create policy "Public listing images" on storage.objects for select 
  using (bucket_id = 'listings');

-- Allow users to upload their own avatars
create policy "User avatar upload" on storage.objects for insert 
  with check (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- SAMPLE data
INSERT INTO brands (name, slug) VALUES ('NVIDIA', 'nvidia'), ('AMD', 'amd'), ('Intel', 'intel');
INSERT INTO categories (name, slug) VALUES ('GPU', 'gpu'), ('CPU', 'cpu'), ('Motherboard', 'motherboard');
```
---

**Indexes for Performance:**

- Full-text search on `parts.search_text` and `listings.title`
- Geographic index on `listings.location_lat/lng`
- Composite index on `listings(status, created_at)` for feeds
---
## **IP Ban Workaround Strategy (Cost-Free)**

### **Solution: Distributed Scraping Network**

**Approach 1: Tor Network Rotation (Free, Unlimited IPs)**
```javascript
// Use tor-request package with auto-rotation
const tor = require('tor-request');
tor.setTorAddress('localhost', 9050); // Local Tor proxy

// Rotate IP every 10 requests
let requestCount = 0;
function scrapeWithTor(url) {
  if (requestCount % 10 === 0) {
    tor.newTorSession(); // Get new exit node
  }
  tor.request(url, callback);
  requestCount++;
}
```
```js
// scrapers/amazon-scraper.js
const tor = require('tor-request');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

tor.setTorAddress('localhost', 9050);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

let requestCount = 0;

async function scrapeAmazon(searchTerm) {
  // Rotate IP every 10 requests
  if (requestCount % 10 === 0) {
    await new Promise(resolve => {
      tor.newTorSession(resolve);
    });
  }

  return new Promise((resolve, reject) => {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}`;
    
    tor.request(url, (err, res, body) => {
      if (err) return reject(err);
      
      const $ = cheerio.load(body);
      const products = [];

      $('.s-result-item').each((i, el) => {
        const title = $(el).find('h2 span').text();
        const price = $(el).find('.a-price-whole').text();
        const image = $(el).find('img').attr('src');

        if (title && price) {
          products.push({ title, price: parseFloat(price), image });
        }
      });

      requestCount++;
      
      // Random delay 3-7 seconds
      setTimeout(() => resolve(products), 3000 + Math.random() * 4000);
    });
  });
}

async function seedListings() {
  const searchTerms = ['RTX 4070', 'Ryzen 7800X3D', 'DDR5 RAM', 'NVMe SSD'];
  const botUsers = await supabase.from('profiles')
    .select('id')
    .like('username', '%_Bot');

  for (const term of searchTerms) {
    const products = await scrapeAmazon(term);
    
    for (const product of products) {
      const randomBot = botUsers.data[Math.floor(Math.random() * botUsers.data.length)];
      
      await supabase.from('listings').insert({
        seller_id: randomBot.id,
        title: product.title,
        price: product.price,
        condition: 'new',
        description: `Sourced from Amazon marketplace`,
      });
    }

    console.log(`Seeded ${products.length} listings for ${term}`);
  }
}

// Run every 6 hours
setInterval(seedListings, 6 * 60 * 60 * 1000);
seedListings(); // Initial run

---

### 5.2 Database Schema (Supabase)

**Core Tables:** (Provided in requirements - see Supabase Schema section)

**Key Relationships:**
```

---


### 5.3 API Design

**RESTful Endpoints (Supabase Auto-Generated + Custom):**

**Auth:**

- `POST /auth/signup` - Create account
- `POST /auth/login` - Email/password
- `POST /auth/oauth` - Google/Apple

**Search & Browse:**

- `GET /api/search?q=rtx+4070&condition=new&maxPrice=800`
- `GET /api/listings?category=gpu&sort=price_asc`
- `GET /api/listings/:id` - Single listing details

**Build Tool:**

- `POST /api/builds` - Save build configuration
- `GET /api/builds/:id` - Retrieve shared build
- `POST /api/builds/compatibility-check` - Validate parts list

**User Actions:**

- `POST /api/listings` - Create listing
- `PATCH /api/listings/:id` - Update listing
- `POST /api/watchlist` - Save listing
- `POST /api/offers` - Make offer
- `GET /api/conversations` - Get user messages

**Admin (Bot Users):**

- `POST /api/admin/seed-listings` - Auto-create from scraped data

---

### 5.4 Third-Party Integrations

| Service         | Purpose             | Free Tier              | Implementation            |
| --------------- | ------------------- | ---------------------- | ------------------------- |
| **Stripe**      | Payment processing  | Yes (2.9% + $0.30/txn) | Phase 2 - Escrow payments |
| **ShipStation** | Shipping labels     | 30-day trial           | Phase 2 - Seller shipping |
| **Cloudinary**  | Image optimization  | 25GB/mo                | Listing image CDN         |
| **Bright Data** | Web scraping        | 5k requests/mo         | Marketplace crawling      |
| **SendGrid**    | Transactional email | 100/day                | Notifications, alerts     |
| **Google Maps** | Local pickup radius | $200/mo credit         | Distance calculations     |
| **Sentry**      | Error tracking      | 5k errors/mo           | Bug monitoring            |

---

## 6. User Experience & Flows

### 6.1 Onboarding Flow

**First-Time User (Mobile):**

1. **Splash Screen:** Animated logo with purple/orange gradient
2. **Welcome Carousel:**
   - Slide 1: "Find the best PC deals across the galaxy"
   - Slide 2: "Build with confidence—we check compatibility"
   - Slide 3: "Join a community of 5,000+ builders"
3. **Sign-Up:**
   - Email/password (with strength indicator)
   - Or "Continue with Google/Apple"
4. **Profile Setup (Optional):**
   - Username, location (for local pickups), avatar
5. **Quick Start:**
   - "What brings you here today?"
     - [ ] I'm building my first PC
     - [ ] I want to upgrade my current build
     - [ ] Just browsing for deals
6. **Guided Tour (Tooltips):**
   - Highlight search bar, build tool, community tabs

**Web Variant:**

- Same flow but with desktop-optimized layouts
- Skip app install prompt

---

### 6.2 Core User Flows

#### Flow 1: Searching for a Part

```
User opens app
→ Taps search bar
→ Types "RTX 4070 Ti"
→ Filters: Used, $500-$700, Ships to ZIP 90210
→ Results load (aggregated from 8 sources)
→ Sorts by "Best Deal" (price vs. avg)
→ Taps listing
→ Sees: Images, specs, price history, seller rating
→ Taps "Message Seller" or "Add to Watchlist"
```

#### Flow 2: Using Build Guidance Tool

```
User taps "Build Tool" tab
→ Step 1: Select use case (Gaming)
→ Step 2: Budget slider ($1,200)
→ Step 3: New vs. Used (Hybrid)
→ Step 4: Target game (Cyberpunk 2077, 1440p, High)
→ AI generates 3 build tiers:
   - Budget: $1,100 (1080p High)
   - Sweet Spot: $1,200 (1440p High) ✅
   - Overkill: $1,500 (4K Ultra)
→ User selects "Sweet Spot"
→ Views part list with buy links
→ Taps "Save Build"
→ Shareable link generated
```

#### Flow 3: Creating a Listing (Seller)

```
User taps "Sell" tab
→ Takes/uploads 5 photos
→ Searches for part (GPU → NVIDIA → RTX 4070)
→ Autofills: Brand, model, specs
→ Enters: Condition (Excellent), Price ($550), Description
→ Shipping: Buyer pays actual cost (calculated by ZIP)
→ Previews listing
→ Taps "Publish"
→ Listing goes live (appears in search immediately)
```

#### Flow 4: Community Interaction

```
User taps "Community" tab
→ Sees: Forum threads, build showcase feed
→ Taps "New Post"
→ Selects category (Build Help)
→ Writes: "Is 650W PSU enough for RTX 4070?"
→ Attaches PC Part Picker list
→ Publishes
→ Receives 3 helpful answers in 20 minutes
→ Upvotes best answer
→ Marks as "Solved"
```

---

### 6.3 Navigation Structure

**Mobile (Bottom Tab Bar):**

1. **Home** 🏠 - Featured deals, build of the week, quick search
2. **Search** 🔍 - Full marketplace search & filters
3. **Build** 🛠️ - Build tool + saved builds
4. **Community** 💬 - Forums + build showcase
5. **Profile** 👤 - Settings, listings, watchlist, messages

**Web (Top Nav + Sidebar):**

- **Top Nav:** Logo, Search bar, Build Tool, Community, Sign In/Profile
- **Sidebar (on listing pages):** Filters, categories, price range

---

## 7. Design System & UI Components

### 7.1 Component Library

**Atomic Design Structure:**

**Atoms:**

- `Button` - Primary (purple gradient), Secondary (outline), Danger (red)
- `Input` - Text, number, search with icon
- `Badge` - Condition tags (New, Excellent, etc.), deal alerts
- `Avatar` - User profile pictures with fallback
- `Icon` - Consistent set (Lucide Icons)

**Molecules:**

- `Card` - Listing preview (image, title, price, location)
- `PriceIndicator` - Shows MSRP, current price, badge (Good Deal, etc.)
- `RatingStars` - 1-5 stars with half-star support
- `SearchBar` - Input + filter button + voice search (mobile)

**Organisms:**

- `ListingGrid` - Responsive grid of listing cards
- `BuildToolWizard` - Multi-step form with progress
- `ChatInterface` - Real-time messaging UI
- `PriceHistoryChart` - Line graph (Chart.js or Recharts)

**Templates:**

- `FeedLayout` - Infinite scroll feed (home, community)
- `DetailLayout` - Hero image + tabbed content (listing details)
- `DashboardLayout` - Sidebar + main content (seller dashboard)

---

### 7.2 Responsive Breakpoints

| Device  | Width        | Layout                            |
| ------- | ------------ | --------------------------------- |
| Mobile  | <640px       | Single column, bottom nav         |
| Tablet  | 640px-1024px | 2-column grid, side nav           |
| Desktop | >1024px      | 3-column grid, persistent sidebar |

---

### 7.3 Accessibility Standards

**WCAG 2.1 AA Compliance:**

- [ ] Color contrast ratio ≥4.5:1 (text), ≥3:1 (UI elements)
- [ ] Keyboard navigation (tab order, focus indicators)
- [ ] Screen reader support (ARIA labels, semantic HTML)
- [ ] Touch targets ≥44x44px (mobile)
- [ ] Text resizable to 200% without loss of functionality

**Testing Tools:**

- axe DevTools, Lighthouse, VoiceOver (iOS), TalkBack (Android)

---

## 8. Go-to-Market Strategy

### 8.1 Launch Phases

**Phase 0: Pre-Launch (Weeks 1-8)**

- Finalize MVP feature set
- Develop brand assets (logo, style guide, social templates)
- Build landing page with email signup
- Seed database with 10,000+ listings (via scraping)
- Create 30 admin bot users with active listings
- Recruit 20 beta testers from r/buildapc

**Phase 1: Soft Launch (Weeks 9-12)**

- Release to beta testers (TestFlight/Google Play Beta)
- Launch web app (public)
- Publish 3-5 community posts on Reddit (organic, value-add)
- Start email drip campaign to signups
- Target: 500 users, 50 forum posts, 20 user listings

**Phase 2: Public Launch (Weeks 13-16)**

- Release iOS/Android apps to public
- Press outreach (TechCrunch, The Verge, PCMag)
- YouTube influencer partnerships (2-3 mid-tier tech channels)
- Paid ads (Google, Meta) - small test budget ($500)
- Target: 2,000 users, 200 listings, 500 forum posts

**Phase 3: Growth (Months 5-6)**

- Feature in Product Hunt launch
- Reddit AMA (r/buildapc, r/pcmasterrace)
- Referral program ("Invite friends, earn credits")
- Target: 5,000 users, 1,000 listings

---

### 8.2 Marketing Channels

#### Organic (Primary Focus - $0 Budget)

1. **Reddit:**

   - **Subreddits:** r/buildapc, r/hardwareswap, r/pcmasterrace, r/buildapcsales
   - **Strategy:** Provide genuine value (build help, deal alerts), no spam
   - **Content:** "I made a tool to compare used GPU prices" (showcase, not ad)

2. **YouTube:**

   - **Strategy:** Partner with mid-tier tech YouTubers (50k-500k subs)
   - **Offer:** Free promotion in exchange for featuring Partopia in build guides
   - **Channels:** JayzTwoCents, Bitwit, Paul's Hardware, RandomGamingInHD

3. **Discord:**

   - **Owned Server:** Create Partopia Discord (community hub)
   - **Partnerships:** Join PC building Discord servers, offer bot integration (deal alerts)

4. **Forums:**

   - Tom's Hardware, Overclock.net, Linus Tech Tips Forum
   - **Strategy:** Active participation, signature link to Partopia

5. **Content Marketing:**
   - **Blog:** "Ultimate 2025 Budget PC Build Guide" (SEO-optimized)
   - **Guides:** "How to Sell Your Used GPU for Max Value"
   - **Videos:** Short-form build tips (TikTok, Instagram Reels, YouTube Shorts)

#### Paid (Phase 2 - Minimal Budget)

1. **Google Ads:**

   - **Keywords:** "buy used RTX 4070", "PC part compatibility checker"
   - **Budget:** $10/day (test & scale)

2. **Meta Ads (Facebook/Instagram):**

   - **Targeting:** 18-35, interested in PC gaming, tech, DIY
   - **Creative:** Carousel ads (before/after builds, deal spotlights)
   - **Budget:** $5/day (retargeting)

3. **Influencer Sponsorships:**
   - **Mid-Tier:** $500-$1,000 per video integration
   - **Micro:** $50-$200 (Instagram/TikTok tech influencers)

---

### 8.3 Launch Messaging

**Tagline:**  
_"Your galactic guide to PC parts—best deals, zero hassle."_

**Elevator Pitch (30 sec):**  
"Partopia is the one app PC builders actually need. Instead of opening 10 tabs to compare prices and stressing about compatibility, we scan every major marketplace, show you the best deals on new and used parts, and guide you to builds that just work. Plus, you can buy, sell, and connect with a community of fellow builders—all in a beautifully designed app. Think PCPartPicker meets Reddit, with a cosmic vibe."

**Value Props (Headline Copy):**

1. **"Find the Best Deals Across 10+ Marketplaces—Instantly"**
2. **"Build with Confidence: AI-Powered Compatibility Checks"**
3. **"Join 5,000+ Builders Sharing Knowledge & Showcasing Rigs"**
4. **"Sell Your Old Parts Faster with Fair Pricing Insights"**

---

### 8.4 Community Building

**Week 1-4: Foundation**

- Launch forum with 5 categories
- Admin team posts 20+ seed threads (FAQs, build guides)
- Invite beta testers to post first builds

**Week 5-8: Activation**

- Host "Build of the Week" contest (winner gets featured on homepage)
- Create "Partopia Deals" Twitter/X account (auto-post price drops)
- Introduce reputation system (upvotes → badges)

**Week 9-12: Growth**

- Launch Discord server (sync with forum)
- Host live Q&A with tech influencer
- Implement user-generated content strategy (build galleries)

**Ongoing:**

- Weekly newsletter: Top 5 deals, community highlights
- Monthly AMA with Partopia team
- Seasonal build themes (Summer RGB Fest, Budget November)

---

## 9. Monetization Strategy

### 9.1 Revenue Streams

**Phase 1 (Free Tier Focus):**

1. **Affiliate Links (Primary):**

   - Amazon Associates (4-6% commission on referred sales)
   - Newegg Affiliate (2-5%)
   - eBay Partner Network (1-4%)
   - **Implementation:** Replace aggregated listing links with affiliate URLs
   - **Revenue Estimate:** $500-$2,000/mo (5k MAU, 3% conversion, $50 avg. order)

2. **Display Ads (Secondary):**

   - Google AdSense (CPM $2-$5)
   - **Placement:** Between search results, forum threads (non-intrusive)
   - **Revenue Estimate:** $200-$500/mo (5k MAU)

3. **Dropshipping Markup (Experimental):**
   - Admin bot users list items from suppliers (AliExpress, DHGate)
   - Mark up 10-15% over cost + shipping
   - **Revenue Estimate:** $300-$1,000/mo (20-30 sales)

**Phase 2 (Months 4-6):** 4. **Premium Seller Tier ($9.99/mo):**

- Features: 20+ simultaneous listings, promoted placement, analytics
- **Target:** 50 power sellers by Month 6
- **Revenue:** $500/mo

5. **Transaction Fees (Marketplace):**

   - 3% final value fee on user-to-user sales
   - Capped at $50 per transaction
   - **Revenue Estimate:** $300-$800/mo (50 sales/mo, $400 avg.)

6. **Listing Fees (Merchants):**
   - Featured placement in search results: $25/mo per product
   - **Target:** 10 merchant partners
   - **Revenue:** $250/mo

**Total Projected Revenue (Month 6):** $3,000-$5,000/mo

---

### 9.2 Cost Structure (Free Tier Strategy)

| Expense                     | Cost/Month | Notes                   |
| --------------------------- | ---------- | ----------------------- |
| **Hosting (Supabase Free)** | $0         | 500MB DB, 2GB bandwidth |
| **Domain**                  | $1         | Namecheap annual ÷ 12   |
| **Vercel (Web Hosting)**    | $0         | Free hobby plan         |
| **Expo EAS (App Builds)**   | $0         | Manual builds (slower)  |
| **Scraping (Bright Data)**  | $0         | 5k requests/mo free     |
| **Email (SendGrid)**        | $0         | 100 emails/day free     |
| **Cloudinary (Images)**     | $0         | 25GB/mo free            |
| **Sentry (Errors)**         | $0         | 5k errors/mo free       |
| **Total**                   | **$1/mo**  | 🎉                      |

**Scaling Costs (Post-5k MAU):**

- Supabase Pro: $25/mo (8GB DB, 50GB bandwidth)
- Bright Data Paid: $500/mo (100k requests)
- Expo EAS: $99/mo (automated builds)
- **Total at Scale:** ~$650/mo (still cash-positive with revenue)

---

## 10. Technical Implementation Roadmap

### 10.1 Development Phases

**Weeks 1-2: Foundation**

- [x] Set up Supabase project + database schema
- [x] Initialize React Native (Expo) project
- [x] Configure Tailwind (NativeWind) + design tokens
- [x] Implement authentication (email + Google OAuth)
- [x] Deploy landing page (Next.js on Vercel)

**Weeks 3-4: Core Features (Search & Browse)**

- [ ] Build marketplace search API (full-text + filters)
- [ ] Implement listing card component + grid layout
- [ ] Create listing detail page (images, specs, price history)
- [ ] Add watchlist functionality (save/unsave)
- [ ] Set up scraping infrastructure (Bright Data + cron jobs)

**Weeks 5-6: Build Tool**

- [ ] Design multi-step wizard UI
- [ ] Implement compatibility logic (CPU-mobo, PSU wattage, GPU clearance)
- [ ] Create build output page (parts list, buy links)
- [ ] Add save/share build feature (unique URLs)
- [ ] Integrate AI suggestions (OpenAI API - optional)

**Weeks 7-8: User Marketplace**

- [ ] Build listing creation form (with image upload)
- [ ] Implement real-time messaging (Supabase Realtime)
- [ ] Create offers system (make offer, counter, accept/reject)
- [ ] Add seller dashboard (my listings, sales, analytics)
- [ ] Set up admin bot users (auto-listing script)

**Weeks 9-10: Community Features**

- [ ] Build forum system (categories, posts, comments)
- [ ] Create build showcase gallery (upload + tag parts)
- [ ] Implement upvote/downvote system
- [ ] Add reputation/badges (Phase 2 prep)
- [ ] Set up moderation tools (report, flag, ban)

**Weeks 11-12: Polish & Launch Prep**

- [ ] Mobile app testing (iOS/Android)
- [ ] Performance optimization (lazy loading, caching)
- [ ] Accessibility audit + fixes
- [ ] Write onboarding tutorial
- [ ] Beta tester recruitment (r/buildapc)
- [ ] App Store submission (iOS review ~1 week)

**Weeks 13-16: Launch & Iterate**

- [ ] Public release (web + app stores)
- [ ] Monitor analytics (Mixpanel/Plausible)
- [ ] Collect user feedback (in-app surveys)
- [ ] Fix critical bugs (prioritize crashes)
- [ ] Ship quick wins (requested features)

---

### 10.2 Technical Risks & Mitigation

| Risk                             | Probability | Impact | Mitigation                                                                    |
| -------------------------------- | ----------- | ------ | ----------------------------------------------------------------------------- |
| **Scraping blocks (robots.txt)** | High        | High   | USE TOR, Use Bright Data rotating IPs, respect rate limits, add delays                 |
| **Free tier limits hit early**   | Medium      | Medium | Monitor usage, implement caching, upgrade to Supabase Pro ($25/mo)            |
| **App Store rejection**          | Medium      | High   | Follow guidelines strictly, avoid web scraping mentions, provide demo account |
| **Poor listing quality (bots)**  | Low         | Medium | Add human review queue, flag suspicious listings, verify sellers              |
| **Slow search performance**      | Medium      | Medium | Use Supabase full-text indexes, implement Redis caching (Phase 2)             |
| **Real-time messaging scale**    | Low         | Low    | Supabase Realtime handles 1M+ concurrent, pagination limits load              |

---

## 11. Success Metrics & KPIs

### 11.1 Product Health Metrics

**User Engagement:**

- **Daily Active Users (DAU) / MAU Ratio:** Target 30% (sticky product)
- **Session Duration:** Avg. 8+ minutes (indicates exploration)
- **Listings Viewed per Session:** 12+ (price comparison happening)
- **Build Tool Completion Rate:** 60%+ (users trust the tool)

**Marketplace Activity:**

- **User-Generated Listings:** 500+ by Month 6
- **Messages Sent:** 1,000+ (buyer-seller communication)
- **Offers Made:** 300+
- **Successful Transactions:** 100+ (3% take rate from listings)

**Community Vibrancy:**

- **Forum Posts:** 1,000+ by Month 6
- **Build Showcase Uploads:** 200+
- **Comments per Post:** Avg. 3+
- **Upvotes per Build:** Avg. 10+

**Revenue (Phase 2):**

- **Affiliate Click-Through Rate:** 3-5%
- **Affiliate Conversion Rate:** 1-2% (of clicks)
- **Premium Subscribers:** 50 sellers ($500/mo)
- **Transaction Fees:** $500/mo (from 50 sales)

---

### 11.2 Analytics Implementation

**Tools:**

- **Mixpanel or PostHog:** Event tracking (searches, listings viewed, messages sent)
- **Plausible:** Privacy-friendly web analytics (page views, referrers)
- **Supabase Analytics:** Database query performance

**Key Events to Track:**

1. `user_signup` (source, device)
2. `search_performed` (query, filters, results_count)
3. `listing_viewed` (listing_id, source, price)
4. `listing_saved` (watchlist additions)
5. `build_tool_started` / `build_tool_completed`
6. `message_sent` (buyer-seller conversation)
7. `offer_made` (amount, listing_id)
8. `listing_created` (user-generated)
9. `affiliate_link_clicked` (marketplace, product)
10. `forum_post_created` / `comment_posted`

---

## 12. Legal & Compliance

### 12.1 Terms of Service (Key Clauses)

**User Responsibilities:**

- Accurate listing descriptions (no misleading info)
- Ownership of sold items (no stolen goods)
- Compliance with marketplace policies (eBay, Amazon TOS)

**Platform Liability:**

- Partopia is a facilitator, not a party to transactions
- Users transact at their own risk (buyer beware)
- No guarantees on item condition/delivery (Phase 1)

**Prohibited Items:**

- Counterfeit parts, stolen goods, hazardous materials

**Data Usage:**

- User content (listings, posts) may be displayed publicly
- Price data aggregated from public marketplaces (fair use)

**Dispute Resolution:**

- Mandatory arbitration clause (avoid class actions)
- Binding arbitration via JAMS or AAA

---

### 12.2 Privacy Policy (GDPR/CCPA Compliance)

**Data Collected:**

- **Account:** Email, username, password (hashed), location (city/ZIP)
- **Usage:** Search queries, listings viewed, messages (encrypted)
- **Device:** IP address, browser/device type, app version

**Data Usage:**

- Provide core services (search, messaging, marketplace)
- Improve product (analytics, A/B testing)
- Send notifications (opt-in)

**Data Sharing:**

- **Never sold** to third parties
- Shared with service providers (Supabase, Stripe)
- Anonymized data for analytics

**User Rights (GDPR/CCPA):**

- Access your data (export JSON)
- Delete your account (right to erasure)
- Opt out of marketing emails

**Cookies:**

- Essential (authentication, session)
- Analytics (Plausible - no tracking)
- No third-party ad cookies (Phase 1)

---

## 13. Support & Operations

### 13.1 Customer Support Strategy

**Phase 1 (Low Volume):**

- **Email Support:** support@partopia.com (founder-managed)
- **Response Time:** <24 hours
- **Help Center:** 10-15 FAQ articles (How to list, shipping, compatibility)
- **Community Support:** Moderators + power users answer questions in forums

**Phase 2 (Scaling):**

- **Live Chat:** Intercom or Crisp (free tier)
- **Ticketing System:** Zendesk or Freshdesk
- **AI Chatbot:** Answer common questions (powered by GPT-4)

---

### 13.2 Moderation & Trust

**Listing Quality Control:**

- **Auto-Flagging:** Detect duplicate listings, suspicious prices (<20% of market value)
- **User Reporting:** "Report this listing" button (spam, scam, prohibited item)
- **Manual Review:** Admin queue for flagged items (15 min/day)

**Seller Verification:**

- **Badge System:**
  - ✅ Email verified
  - ⭐ Trusted Seller (10+ sales, 4.5+ rating)
  - 🏆 Power Seller (50+ sales, 4.8+ rating)

**Scam Prevention:**

- Require sellers to verify phone number (SMS) before listing
- Limit new users to 5 listings/week (prevent spam)
- Escrow system (Phase 2) holds funds until delivery confirmed

---

## 14. Future Roadmap (Post-MVP)

### 14.1 Year 1 (Months 7-12)

**Q3:**

- Price alert notifications (push + email)
- Advanced filters (RGB lighting, overclockable, warranty remaining)
- Build templates (streamer, budget gamer, workstation)
- Seller analytics dashboard (views, conversion rate)

**Q4:**

- Mobile app optimization (offline mode, faster image loading)
- Video uploads (build logs, unboxings)
- Referral program (invite friends, earn $5 credit)
- API access for developers (rate-limited)

---

### 14.2 Year 2 (Expansion)

**Features:**

- **PC Builder Simulator:** 3D drag-and-drop interface (Three.js)
- **Trade-In Program:** Sell old parts directly to Partopia for instant credit
- **Subscription Boxes:** Monthly "Mystery GPU" (refurbished) for $50
- **B2B Portal:** Merchant dashboard for bulk listings

**Geographic Expansion:**

- Europe (UK, Germany, France)
- Asia-Pacific (Australia, South Korea)
- Localized pricing (GBP, EUR, AUD)

**Platform Extensions:**

- Desktop app (Electron) for power users
- Browser extension (quick price comparison while shopping)
- Smart home integrations (Alexa: "Find me the cheapest RTX 4080")

---

## 15. Appendix

### 15.1 Competitor Analysis

| Competitor               | Strengths                                     | Weaknesses                                      | Our Advantage                         |
| ------------------------ | --------------------------------------------- | ----------------------------------------------- | ------------------------------------- |
| **PCPartPicker**         | Huge database, compatibility checker, trusted | No used marketplace, cluttered UI, no community | Unified marketplace + sleek UI        |
| **eBay**                 | Massive used inventory, buyer protection      | Not PC-specific, poor search, scams             | Curated PC parts, compatibility check |
| **Facebook Marketplace** | Local pickups, huge user base                 | No compatibility check, sketchy sellers         | Trust & guidance                      |
| **Jawa.gg**              | Local gaming deals                            | Limited to local, no build tool                 | Multi-marketplace + AI builds         |
| **r/hardwareswap**       | Community trust, good prices                  | Manual posting, no payments, scattered          | Integrated marketplace + escrow       |

---

### 15.2 Design Inspiration References

1. **Cosmic Portfolio (Behance):** Hero gradients, floating elements
2. **Cosmic Colonizers (Behance):** Card hover effects, glass morphism
3. **Luxury Shopping App (Behance):** Product detail layout, price displays
4. **GameHaven (Dribbble):** Bottom nav, dark mode aesthetics
5. **CosmicOdyssey 404 (Dribbble):** Playful error states, animations

---

### 15.3 Key Assumptions

1. **User Behavior:** PC builders visit 3+ marketplaces per purchase
2. **Conversion Rate:** 3% of users click affiliate links, 30% convert
3. **Community Growth:** 20% of users contribute to forums/builds
4. **Scraping Success:** 80%+ uptime on marketplace data freshness
5. **Mobile Adoption:** 60% of traffic from mobile (iOS/Android)

---

### 15.4 Open Questions for Validation

- [ ] **Will users trust admin bot listings?** (Beta test response)
- [ ] **Is 3% transaction fee acceptable?** (Survey target audience)
- [ ] **Can we sustain free tier beyond 10k MAU?** (Monitor costs)
- [ ] **Do users prefer dark mode?** (A/B test on launch)
- [ ] **Should we prioritize iOS or Android first?** (Check Reddit demographics)

---

## 16. Approval & Sign-Off

**Document Status:** ✅ Ready for Development  
**Next Steps:**

1. Review PRD with founding team
2. Finalize design mockups (Figma)
3. Begin Week 1-2 development (Foundation phase)
4. Schedule weekly sprint reviews

**Contact:**

- **Product Lead:** [Your Name]
- **Tech Lead:** [Developer Name]
- **Design Lead:** [Designer Name]

---

**End of PRD**
