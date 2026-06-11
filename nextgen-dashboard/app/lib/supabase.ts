import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eizwcbidewqgranikyva.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpendjYmlkZXdxZ3JhbmlreXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODgzODYsImV4cCI6MjA5Njc2NDM4Nn0.1Q5rntakwJcEU3FMn34O1DyyVZst8erEnymAzNxnqKY";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase configuration environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);