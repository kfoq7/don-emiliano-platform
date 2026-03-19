import { defineMiddleware } from 'astro:middleware'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_KEY

export const onRequest = defineMiddleware(async ({ cookies, locals }, next) => {
  // Initialize user as null
  locals.user = null

  // Get access token from cookies
  const accessToken = cookies.get('sb-access-token')?.value
  const refreshToken = cookies.get('sb-refresh-token')?.value

  if (accessToken && refreshToken) {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    })

    // Set the session from cookies
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    })

    if (!error && data.user) {
      locals.user = data.user

      // If tokens were refreshed, update cookies
      if (data.session) {
        const cookieOptions = {
          path: '/',
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: 'lax' as const,
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }

        cookies.set('sb-access-token', data.session.access_token, cookieOptions)
        cookies.set('sb-refresh-token', data.session.refresh_token, cookieOptions)
      }
    }
  }

  return next()
})
