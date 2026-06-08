import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jzuimfpyzjvgqqpiabqp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dWltZnB5emp2Z3FxcGlhYnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTA2MDYsImV4cCI6MjA5NjQ4NjYwNn0.FC0PQYbsLjZsYWYeMneqfP-vz6EcRi9243xbUOPU0n8'

export const supabase = createClient(supabaseUrl, supabaseKey)