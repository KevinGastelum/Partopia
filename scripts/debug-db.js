require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('--- Debugging Supabase Connection ---');
console.log('URL from env:', url);
console.log('Key length:', key ? key.length : 'MISSING');

if (!url || !key) {
  console.error('Missing URL or Key');
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  const start = Date.now();
  console.log('Attempting to fetch brands...');
  const { data, error } = await supabase.from('brands').select('count', { count: 'exact', head: true });
  const end = Date.now();
  
  if (error) {
    console.error('❌ Connection Failed:', error.message);
    console.error('Details:', error);
  } else {
    console.log('✅ Connection Successful!');
    console.log('Time taken:', end - start, 'ms');
  }
}

test();
