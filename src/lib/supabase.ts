import { createClient } from '@supabase/supabase-js'

// Capture hash BEFORE Supabase clears it — used by MagicLinkHandler
export const initialHash = window.location.hash

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
