import { supabase } from '@/supabase-admin'

export const fetchAllProducts = async () => {
  const { data, error } = await supabase.from('products').select(`
      *,
      category:categories(
       id,
       name
      )
    `)
  console.log(data, error)

  if (error) {
    console.log('Error fetching products:', error)
    return
  }

  return data
}
