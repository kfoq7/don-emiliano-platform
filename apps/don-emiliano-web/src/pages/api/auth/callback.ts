import type { APIRoute } from 'astro'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_KEY

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code')

  if (!code) {
    return redirect('/admin/login?error=missing_code')
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  })

  // Exchange the code for a session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    console.error('Auth callback error:', error?.message)
    return redirect('/admin/login?error=auth_failed')
  }

  // Set session cookies
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }

  cookies.set('sb-access-token', data.session.access_token, cookieOptions)
  cookies.set('sb-refresh-token', data.session.refresh_token, cookieOptions)

  // Redirect to admin page - the admin page will check if user has proper role
  return redirect('/admin')
}
