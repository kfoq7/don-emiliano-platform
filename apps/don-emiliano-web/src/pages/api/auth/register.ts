import { createClient } from '@/supabase'
import { supabase as adminSupabase } from '@/supabase-admin'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData()
  const name = formData.get('name')?.toString()?.trim()
  const email = formData.get('email')?.toString()?.trim()
  const redirectTo = formData.get('redirect')?.toString() || '/'

  // Validate name
  if (!name || name.length < 2) {
    return redirect(
      `/ingresar?register=true&email=${encodeURIComponent(email || '')}&error=invalid_name&redirect=${encodeURIComponent(redirectTo)}`,
    )
  }

  // Get current auth user
  const supabase = createClient({ request, cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/ingresar?error=auth_failed')
  }

  // Create customer record
  const customerEmail = email || user.email

  try {
    const { data: newCustomer, error: insertError } = await adminSupabase
      .from('customers')
      .insert({
        name,
        email: customerEmail?.toLowerCase(),
        user_id: user.id,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('Error creating customer:', insertError)

      // Check if it's a duplicate email error
      if (insertError.code === '23505') {
        return redirect(`/ingresar?error=email_exists&redirect=${encodeURIComponent(redirectTo)}`)
      }

      return redirect(
        `/ingresar?register=true&email=${encodeURIComponent(customerEmail || '')}&name=${encodeURIComponent(name)}&error=registration_failed&redirect=${encodeURIComponent(redirectTo)}`,
      )
    }

    // Registration successful - redirect to intended destination
    return redirect(redirectTo)
  } catch (error) {
    console.error('Unexpected registration error:', error)
    return redirect(
      `/ingresar?register=true&email=${encodeURIComponent(customerEmail || '')}&name=${encodeURIComponent(name)}&error=registration_failed&redirect=${encodeURIComponent(redirectTo)}`,
    )
  }
}
