import { createClient } from '@supabase/supabase-js'

// ──────────────────────────────────────────────
// 🔑 REPLACE THESE WITH YOUR SUPABASE CREDENTIALS
//    (Project Settings → API in your Supabase dashboard)
// ──────────────────────────────────────────────

const SUPABASE_URL = 'https://zvrzgkybarrpmqrnjhpt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2cnpna3liYXJycG1xcm5qaHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzODQyNjEsImV4cCI6MjA5MDk2MDI2MX0.9iv0gh92JyHg4t9piSp5FE8AMg3DorjhpwIK-h7JSuE'

// ──────────────────────────────────────────────

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
