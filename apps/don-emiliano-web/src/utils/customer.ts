import { supabase } from '@/supabase-admin'

/**
 * Check if a user is registered as a customer in the customers table.
 * Searches by user_id (auth.users foreign key), email, or phone.
 * @param userId - The Supabase auth user ID
 * @param email - The user's email (optional)
 * @param phone - The user's phone (optional)
 * @returns Promise<boolean> - True if user is a registered customer
 */
export const isRegisteredCustomer = async (
  userId: string | undefined,
  email?: string | null,
  phone?: string | null,
): Promise<boolean> => {
  if (!userId && !email && !phone) return false

  // Build query conditions
  let query = supabase.from('customers').select('id')

  // Try to find by user_id first (linked auth user)
  if (userId) {
    const { data: byUserId } = await supabase
      .from('customers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle()

    if (byUserId) return true
  }

  // Try to find by email
  if (email) {
    const { data: byEmail } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle()

    if (byEmail) return true
  }

  // Try to find by phone (normalize phone format)
  if (phone) {
    // Remove +51 prefix if present for comparison
    const normalizedPhone = phone.replace(/^\+51/, '').replace(/\D/g, '')

    const { data: byPhone } = await supabase
      .from('customers')
      .select('id')
      .or(`phone.eq.${normalizedPhone},phone.eq.+51${normalizedPhone}`)
      .maybeSingle()

    if (byPhone) return true
  }

  return false
}

/**
 * Get customer data by auth user ID, email, or phone.
 * @param userId - The Supabase auth user ID
 * @param email - The user's email (optional)
 * @param phone - The user's phone (optional)
 * @returns Promise<Customer | null>
 */
export const getCustomer = async (
  userId: string | undefined,
  email?: string | null,
  phone?: string | null,
) => {
  if (!userId && !email && !phone) return null

  // Try to find by user_id first
  if (userId) {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (data) return data
  }

  // Try to find by email
  if (email) {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email.toLowerCase())
      .maybeSingle()

    if (data) return data
  }

  // Try to find by phone
  if (phone) {
    const normalizedPhone = phone.replace(/^\+51/, '').replace(/\D/g, '')

    const { data } = await supabase
      .from('customers')
      .select('*')
      .or(`phone.eq.${normalizedPhone},phone.eq.+51${normalizedPhone}`)
      .maybeSingle()

    if (data) return data
  }

  return null
}

/**
 * Link an auth user to an existing customer record.
 * Used when a customer logs in for the first time.
 * @param customerId - The customer record ID
 * @param userId - The Supabase auth user ID to link
 */
export const linkCustomerToAuthUser = async (customerId: number, userId: string) => {
  const { error } = await supabase
    .from('customers')
    .update({ user_id: userId })
    .eq('id', customerId)

  if (error) {
    console.error('Error linking customer to auth user:', error)
  }

  return !error
}
