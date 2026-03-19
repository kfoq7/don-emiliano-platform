import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_KEY

// Supabase client for general use
export const supabase = createClient(supabaseUrl, supabaseKey)
