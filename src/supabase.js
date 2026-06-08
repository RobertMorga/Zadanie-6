import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'TUTAJ_WKLEJ_SWOJ_PROJECT_URL'
const supabaseKey = 'TUTAJ_WKLEJ_SWOJ_ANON_PUBLIC_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)