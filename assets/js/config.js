import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hogvdijktcdrhzjoscyt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZ3ZkaWprdGNkcmh6am9zY3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NTUyNTcsImV4cCI6MjA4NzIzMTI1N30.fYkzcUNz3URYhlQHaB8PXKgFN41fTc1F0k7xnwhGPZI' 

export const supabase = createClient(supabaseUrl, supabaseKey)