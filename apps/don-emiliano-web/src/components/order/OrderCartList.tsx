import { useStore } from '@nanostores/preact'
import { productItems } from '@/stores/order'
import { useHydration } from '@/lib/hooks/hydration'

export default function OrderCartList() {
  const $products = useStore(productItems)
  const { hydrated } = useHydration({ item: Object.values($products) })

  if (!hydrated) {
    return (
      <div className="h-120 overflow-y-scroll flex items-center justify-center">
        <span className="text-gray-500">Cargondo orden...</span>
      </div>
    )
  }

  return (
    <div className="h-70 overflow-y-auto">
      <div className="my-2 px-3 h-full">
        {Object.values($products).length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">No hay productos seleccionados.</span>{' '}
          </div>
        ) : (
          Object.values($products).map(({ id, name, quantity }) => (
            <div key={id} className="flex items-center justify-between py-4">
              <div className="font-semibold text-lg">{name}</div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Cantidad: {quantity}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
