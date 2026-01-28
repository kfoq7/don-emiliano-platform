import { addProductItem } from '@/stores/order'
import type { Product } from '@/types/Product'

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  return (
    <div className="flex justify-between px-4 py-2 bg-white border border-gray-200/40 rounded-md drop-shadow-sm">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-auto object-cover rounded"
          />
        )}

        <div class="flex items-center justify-between gap-4 w-full">
          <div>
            <h3 className="font-bold text-xl text-left">{product.name}</h3>
            <p>{product.description}</p>
          </div>

          <div>
            <span>S/. {product.price}</span>
          </div>
        </div>

        <button
          className="px-2 py-2.5 border border-gray-400 rounded-md cursor-pointer w-full hover:bg-amber-400 hover:border-amber-400"
          onClick={() => addProductItem(product)}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}
