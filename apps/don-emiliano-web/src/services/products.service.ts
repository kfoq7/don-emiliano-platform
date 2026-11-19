import { supabase } from '@/supabase-admin'

export const fetchAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      category:categories(
       id,
       name
      )
    `,
    )
    .order('id')

  if (error) {
    console.log('Error fetching products:', error)
    return
  }

  return data
}
