
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
// Use environment variables with fallback to hardcoded values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vhuxtlfacydfkiiuhffv.supabase.co'; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodXh0bGZhY3lkZmtpaXVoZmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0Mjk0NDEsImV4cCI6MjA4MDAwNTQ0MX0.iaEoVH-G4xZgu0gA1ZH13VbowH8UFSftHP4FELo_Gpc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
