import { OrderCartList } from './OrderCartList.tsx'
import { useProductItemsTotal, productItems } from '@/stores/order'
import { Divider } from '@/components/ui'
import { createOrderMesesage } from '@/lib/utils/create-order-message.ts'

export default function OrderCart() {
  const total = useProductItemsTotal()

  const handleOrder = () => {
    window.location.href = '/onbording'
    // const orderMessage = createOrderMesesage({
    //   totalPrice: total,
    //   items: Object.values(productItems.get()),
    // })
    //
    // const encodedMessage = encodeURIComponent(orderMessage)
    //
    // const phoneNumber = '51947382150'
    // const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    //
    // window.open(whatsappURL, '_blank')
  }

  return (
    <>
      <OrderCartList />
      <Divider />
      <div className="w-full flex items-center justify-between ">
        <div className="text-xl font-bold text-right uppercase">Total: S/.{total}</div>
        <button onClick={handleOrder} className="px-4 py-2 bg-amber-400 rounded-md">
          Ordenar
        </button>
      </div>
    </>
  )
}
