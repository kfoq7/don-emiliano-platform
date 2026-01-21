import { useCreateProductForm } from '../hooks/use-create-product-form.tsx'

interface ProductFormProps {
  onSuccess?: () => void
}

// TODO: Replace categoryId with select Field
export const ProductForm = ({ onSuccess }: ProductFormProps) => {
  const { onSubmitForm, register, errors, isCreateProductPending } =
    useCreateProductForm({
      onSuccess,
    })

  return (
    <form onSubmit={onSubmitForm} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium mb-1">
          Category ID
        </label>
        <input
          id="categoryId"
          type="number"
          {...register('categoryId', { valueAsNumber: true })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('isAvailable')} />
          <span className="text-sm font-medium">Available</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('isStockAvailabel')} />
          <span className="text-sm font-medium">Stock Available</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isCreateProductPending}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isCreateProductPending ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  )
}
