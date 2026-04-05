import { createClient } from '@supabase/supabase-js'

// ──────────────────────────────────────────────
// 🔑 REPLACE THESE WITH YOUR SUPABASE CREDENTIALS
//    (Project Settings → API in your Supabase dashboard)
// ──────────────────────────────────────────────

const SUPABASE_URL = 'https://zvrzgkybarrpmqrnjhpt.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_9YeHB2b0tCLkqiTg8ct-Fg_DcWDAM2C'

// ──────────────────────────────────────────────

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
