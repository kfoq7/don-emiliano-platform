/// <reference types="astro/client" />

import type { User } from '@supabase/supabase-js'

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string
  readonly SUPABASE_URL: string
  readonly SUPABASE_KEY: string
  readonly ADMIN_USERS_IDS: string
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
