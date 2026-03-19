/// <reference types="astro/client" />

import type { User } from '@supabase/supabase-js'

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string
  readonly SUPABASE_URL: string
  readonly SUPABASE_KEY: string
  readonly ADMIN_USERS_IDS: string
  // Public keys for client-side Supabase (same values, exposed to browser)
  readonly PUBLIC_SUPABASE_URL: string
  readonly PUBLIC_SUPABASE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace App {
    interface Locals {
      user: null | User
    }
  }

  interface Window {
    L: any
  }
}
