import { createClient } from '@supabase/supabase-js';

// 1. Grab your environment variables from Vercel/Local .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. The "Safety Guard": If these are missing, the build will stop and tell you.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'CRITICAL ERROR: Missing Supabase Environment Variables. ' +
    'Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel settings.'
  );
}

// 3. Create and export the single connection instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
