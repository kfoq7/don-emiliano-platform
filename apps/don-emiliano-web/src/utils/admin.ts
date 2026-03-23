import { supabase } from '@/supabase-admin'

// Roles that are allowed to access admin pages
const ALLOWED_ADMIN_ROLES = ['admin', 'staff']

/**
 * Check if a user has admin or staff role by querying the database.
 * Queries: users -> user_roles -> roles
 * @param userId - The user ID to check
 * @returns Promise<boolean> - True if user has admin or staff role
 */
export const isAdminOrStaff = async (userId: string | undefined): Promise<boolean> => {
  if (!userId) return false

  const { data, error } = await supabase
    .from('user_roles')
    .select(
      `
      roles!inner (
        name
      )
    `,
    )
    .eq('user_id', userId)

  if (error || !data || data.length === 0) {
    return false
  }

  // Check if any of the user's roles are in the allowed list
  // Supabase returns roles as an object when using !inner join
  return data.some(userRole => {
    const roles = userRole.roles as unknown as { name: string }
    return ALLOWED_ADMIN_ROLES.includes(roles.name.toLowerCase())
  })
}

/**
 * @deprecated Use isAdminOrStaff() instead - this function uses hardcoded IDs
 */
export const isAdmin = (id: string | undefined): boolean => {
  const ADMIN_IDS = import.meta.env.ADMIN_USERS_IDS?.split(',') ?? []
  if (!id) return false
  return ADMIN_IDS.includes(id)
}
