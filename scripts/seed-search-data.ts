require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log('🌱 Starting seed process...');

  // 1. Log in as the test user to get a session (since we might only have Anon key)
  // This allows us to insert listings as an authenticated user
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'partopia_test@gmail.com',
    password: 'password123',
  });

  if (authError || !authData.user) {
      console.error('❌ Failed to login. Please ensure the test user exists (run create-test-user.js).', authError?.message);
      return;
  }

  const sellerId = authData.user.id;
  console.log(`👤 Logged in as: ${authData.user.email} (${sellerId})`);

  // 2. Insert Brands (if not exist)
  const brands = [
    { name: 'NVIDIA', slug: 'nvidia' },
    { name: 'AMD', slug: 'amd' },
    { name: 'Intel', slug: 'intel' },
    { name: 'Corsair', slug: 'corsair' },
    { name: 'Samsung', slug: 'samsung' },
    { name: 'NZXT', slug: 'nzxt' },
  ];

  const { data: brandData, error: brandError } = await supabase
    .from('brands')
    .upsert(brands, { onConflict: 'slug' })
    .select();

  if (brandError) {
      console.error('❌ Error seeding brands:', brandError);
      return;
  }
  console.log('✅ Brands seeded');

  // 3. Insert Categories (if not exist)
  const categories = [
    { name: 'GPU', slug: 'gpu', sort_order: 1 },
    { name: 'CPU', slug: 'cpu', sort_order: 2 },
    { name: 'RAM', slug: 'ram', sort_order: 3 },
    { name: 'Storage', slug: 'storage', sort_order: 4 },
    { name: 'Case', slug: 'case', sort_order: 5 },
    { name: 'Motherboard', slug: 'motherboard', sort_order: 6 },
    { name: 'Monitor', slug: 'monitor', sort_order: 7 },
  ];

  const { data: categoryData, error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'slug' })
    .select();

  if (catError) {
      console.error('❌ Error seeding categories:', catError);
      return;
  }
  console.log('✅ Categories seeded');

  // Helper to get ID by slug
  const getBrandId = (slug) => brandData.find(b => b.slug === slug)?.id;
  const getCatId = (slug) => categoryData.find(c => c.slug === slug)?.id;

  // 4. Insert Parts
  const parts = [
    {
      model: 'GeForce RTX 4090',
      brand_id: getBrandId('nvidia'),
      category_id: getCatId('gpu'),
      msrp: 1599.00,
      release_year: 2022,
    },
    {
      model: 'GeForce RTX 4070',
      brand_id: getBrandId('nvidia'),
      category_id: getCatId('gpu'),
      msrp: 599.00,
      release_year: 2023,
    },
    {
      model: 'Ryzen 7 7800X3D',
      brand_id: getBrandId('amd'),
      category_id: getCatId('cpu'),
      msrp: 449.00,
      release_year: 2023,
    },
    {
      model: 'Core i9-13900K',
      brand_id: getBrandId('intel'),
      category_id: getCatId('cpu'),
      msrp: 589.00,
      release_year: 2022,
    },
    {
      model: '990 PRO 2TB',
      brand_id: getBrandId('samsung'),
      category_id: getCatId('storage'),
      msrp: 169.99,
      release_year: 2022,
    },
    {
      model: 'Vengeance RGB 32GB',
      brand_id: getBrandId('corsair'),
      category_id: getCatId('ram'),
      msrp: 119.99,
      release_year: 2022,
    },
     {
      model: 'H9 Flow',
      brand_id: getBrandId('nzxt'),
      category_id: getCatId('case'),
      msrp: 159.99,
      release_year: 2023,
    },
  ];

  // We loop to insert parts to get their IDs back reliably for listings
  const createdParts = [];
  for (const part of parts) {
      // Check if exists first to avoid duplicates if re-running
      const { data: existing } = await supabase.from('parts').select('id').eq('model', part.model).maybeSingle();
      
      if (existing) {
          createdParts.push({ ...part, id: existing.id });
      } else {
          const { data, error } = await supabase.from('parts').insert(part).select().single();
          if (error) {
              console.error(`❌ Error creating part ${part.model}:`, error.message);
          } else {
              createdParts.push(data);
          }
      }
  }
  console.log(`✅ ${createdParts.length} Parts synced`);

  // 5. Insert Listings
  const listings = [
    {
      title: 'RTX 4090 FE - Lightly Used',
      description: 'Used for about 3 months for gaming only. Comes with box.',
      price: 1450.00,
      condition: 'excellent',
      part_model: 'GeForce RTX 4090',
      status: 'active',
    },
    {
      title: 'Brand New RTX 4070',
      description: 'Sealed in box. Won in a raffle.',
      price: 550.00,
      condition: 'new',
      part_model: 'GeForce RTX 4070',
      status: 'active',
    },
    {
      title: 'Corsair RAM 32GB Kit',
      description: 'DDR5 6000MHz. Runs stable.',
      price: 85.00,
      condition: 'fair',
      part_model: 'Vengeance RGB 32GB',
      status: 'active',
    },
     {
      title: 'NZXT H9 Flow White',
      description: 'Beautiful case, switching to ITX so dont need it.',
      price: 120.00,
      condition: 'excellent',
      part_model: 'H9 Flow',
      status: 'active',
    },
  ];

  for (const listing of listings) {
      const part = createdParts.find(p => p.model === listing.part_model);
      if (!part) continue;

      const { error } = await supabase.from('listings').insert({
          seller_id: sellerId,
          part_id: part.id,
          title: listing.title,
          description: listing.description,
          price: listing.price,
          condition: listing.condition,
          status: listing.status,
          // Random coordinates around San Francisco/Silicon Valley for location test
          location_lat: 37.7749 + (Math.random() - 0.5) * 0.1,
          location_lng: -122.4194 + (Math.random() - 0.5) * 0.1,
          city: 'San Francisco',
          state: 'CA'
      });

      if (error) console.error(`❌ Error creating listing ${listing.title}:`, error.message);
  }

  console.log('✅ Listings seeded successfully!');
}

seedData();
