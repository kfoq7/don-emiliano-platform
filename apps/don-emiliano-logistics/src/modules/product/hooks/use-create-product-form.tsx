import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProduct } from './use-create-product.ts'
import { CreateProduct } from '../types/ProductForms'

// Create a Schema to validate fields in form
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be positive'),
  categoryId: z.number().min(1, 'Please select a valid category'),
  isAvailable: z.boolean().optional(),
  isStockAvailabel: z.boolean().optional(),
})

interface ProductFormHook {
  onSuccess?: () => void
}

export function useCreateProductForm({ onSuccess }: ProductFormHook) {
  const { createProduct, isCreateProductPending } = useCreateProduct()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      isAvailable: true,
      isStockAvailabel: true,
      categoryId: 0,
      // ...defaultValues,
    },
  })

  const onSubmit = (data: CreateProduct) => {
    createProduct(data, {
      onSuccess: () => {
        reset()
        onSuccess?.()
      },
    })
  }

  return {
    register,
    isCreateProductPending,
    onSubmitForm: handleSubmit(onSubmit),
    errors,
  }
}
