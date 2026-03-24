import { createClient } from '@/supabase'
import { isAdminOrStaff } from '@/utils/admin'
import { isRegisteredCustomer, getCustomer, linkCustomerToAuthUser } from '@/utils/customer'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request, url, cookies, redirect }) => {
  const code = url.searchParams.get('code')
  const nextPath = url.searchParams.get('next') || '/'

  // OAuth flow - needs code exchange
  if (!code) {
    return redirect('/ingresar?error=no_code')
  }

  const supabase = createClient({ request, cookies })

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error)
      return redirect('/ingresar?error=auth_failed')
    }

    if (data.session && data.user) {
      const user = data.user

      // Check if accessing admin routes
      const isAdminRoute = nextPath.startsWith('/admin')

      if (isAdminRoute) {
        // Admin/staff validation
        const hasAdminAccess = await isAdminOrStaff(user.id)
        if (!hasAdminAccess) {
          await supabase.auth.signOut()
          return redirect('/404')
        }
        return redirect(nextPath)
      }

      // Customer validation for non-admin routes
      const isCustomer = await isRegisteredCustomer(user.id, user.email, user.phone)

      if (!isCustomer) {
        // Try to find and link existing customer by email/phone
        const customer = await getCustomer(undefined, user.email, user.phone)

        if (customer) {
          // Link the auth user to existing customer
          await linkCustomerToAuthUser(customer.id, user.id)
        } else {
          // User is not a registered customer - redirect to registration form
          const userName = user.user_metadata?.full_name || user.user_metadata?.name || ''
          const userEmail = user.email || ''
          const registerUrl = `/ingresar?register=true&email=${encodeURIComponent(userEmail)}&name=${encodeURIComponent(userName)}&redirect=${encodeURIComponent(nextPath)}`
          return redirect(registerUrl)
        }
      }

      return redirect(nextPath)
    }
  } catch (error) {
    console.error('Unexpected error in OAuth callback:', error)
    return redirect('/ingresar?error=auth_failed')
  }

  return redirect('/ingresar?error=auth_failed')
}
