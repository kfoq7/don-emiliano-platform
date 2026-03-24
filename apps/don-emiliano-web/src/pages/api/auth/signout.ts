import { createClient } from '@/supabase'
import type { APIRoute } from 'astro'

// Support both GET (for link clicks) and POST (for form submissions)
const handleSignOut: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = createClient({ request, cookies })

  // Clear auth cookies
  cookies.delete('sb-access-token', { path: '/' })
  cookies.delete('sb-refresh-token', { path: '/' })

  // Clear guest phone session
  cookies.delete('guest_phone', { path: '/' })

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign out error:', error)
    // Still redirect even if there's an error - cookies are cleared
  }

  return redirect('/')
}

export const GET: APIRoute = handleSignOut
export const POST: APIRoute = handleSignOut
