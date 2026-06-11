import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eizwcbidewqgranikyva.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpendjYmlkZXdxZ3JhbmlreXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMzM5NDYsImV4cCI6MjAzMzczOTk0Nn0.1Q5rntakwJCEuM3FMn3401DyyVZst8erEnymAzNxnqKY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);