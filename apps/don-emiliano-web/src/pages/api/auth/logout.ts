import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Clear session cookies
  cookies.delete('sb-access-token', { path: '/' })
  cookies.delete('sb-refresh-token', { path: '/' })

  // Redirect to login page
  return redirect('/admin/login')
}

export const POST: APIRoute = async ({ cookies, redirect }) => {
  // Clear session cookies
  cookies.delete('sb-access-token', { path: '/' })
  cookies.delete('sb-refresh-token', { path: '/' })

  // Redirect to login page
  return redirect('/admin/login')
}
