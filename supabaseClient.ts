
import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
const supabaseUrl = 'https://vhuxtlfacydfkiiuhffv.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodXh0bGZhY3lkZmtpaXVoZmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0Mjk0NDEsImV4cCI6MjA4MDAwNTQ0MX0.iaEoVH-G4xZgu0gA1ZH13VbowH8UFSftHP4FELo_Gpc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
