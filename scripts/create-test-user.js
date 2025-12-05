require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  const email = 'partopia_test@gmail.com';
  const password = 'password123';

  console.log(`Attempting to create user: ${email}`);

  // 1. Try to sign up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: 'TestUser',
      },
    },
  });

  if (error) {
    console.error('Error creating user:', error.message);
    return;
  }

  console.log('User created successfully:', data.user?.id);

  // 2. If using Service Key, we can auto-confirm (if not already confirmed)
  // Note: This requires the SERVICE_KEY, not just the ANON_KEY. 
  // If the user only has ANON_KEY, they might still need to confirm email manually 
  // or disable "Confirm Email" in Supabase dashboard.
  
  if (process.env.SUPABASE_SERVICE_KEY) {
      console.log('Attempting to auto-confirm user...');
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        data.user.id,
        { email_confirm: true }
      );
      if (updateError) {
          console.error('Failed to auto-confirm:', updateError.message);
      } else {
          console.log('User auto-confirmed!');
      }
  } else {
      console.log('NOTE: If email confirmation is enabled in your Supabase project, you must verify the email link sent to ' + email);
  }
}

createTestUser();
