import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/use-products'
import { useCart } from '../hooks/useCart'
import { submitOrder } from '../services/dashboard.service'
import { ProductCard } from '../components/ProductCard'
import { CartItemComponent } from '../components/CartItemComponent'

export default function Dashboard() {
  const { products, error, isLoading, searchTerm, hanldeSearchTermChange } =
    useProducts()

  const {
    selectedProducts,
    toggleProductSelection,
    updateQuantity,
    updateObservacion,
    clearCart,
    totalAmount,
    totalItems,
  } = useCart()

  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const tableId = localStorage.getItem('oms_tableId')
    // Check auth
    if (!localStorage.getItem('oms_auth')) {
      navigate('/')
    } else if (!tableId) {
      navigate('/tables')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('oms_auth')
    localStorage.removeItem('oms_userId')
    localStorage.removeItem('oms_tableId')
    navigate('/')
  }

  const handleConfirmOrder = async () => {
    if (selectedProducts.length === 0) {
      alert('No hay productos para enviar.')
      return
    }

    setIsSubmitting(true)

    try {
      await submitOrder(selectedProducts, totalAmount)

      // Success
      alert('Pedido enviado correctamente!')
      clearCart() // Clear cart
      setIsSummaryOpen(false) // Close mobile sheet

      // Clear local storage logic for logging out / returning to main login
      localStorage.removeItem('oms_auth')
      localStorage.removeItem('oms_userId')
      localStorage.removeItem('oms_userName')
      localStorage.removeItem('oms_tableId')
      localStorage.removeItem('oms_tableName')

      navigate('/')
    } catch (e: any) {
      console.error(e)
      alert(e.message || 'Error al enviar el pedido')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-hover">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border-light sticky top-0 z-50">
        <div className="max-w-spacing-middle mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/active-tables')}
              className="p-2 -ml-2 text-ink-muted hover:text-primary hover:bg-surface-hover rounded-full transition-colors"
              aria-label="Volver a mesas activas"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-heading hidden sm:block">
              Don Emiliano <span className="text-primary">OMS</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-ink-muted hover:text-primary transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-spacing-middle mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Product List */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-border-light overflow-hidden flex flex-col h-[calc(100vh-140px)]">
            <div className="px-6 py-4 border-b border-border-light space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-heading">
                  Productos
                </h2>
                <span className="text-sm text-ink-muted">
                  {products.length} encontrados
                </span>
              </div>

              <form className="relative" onSubmit={e => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Buscar por descripción..."
                  value={searchTerm}
                  onChange={e => hanldeSearchTermChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <svg
                  className="w-5 h-5 text-ink-muted absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 px-3 py-1 bg-surface-hover hover:bg-border-light text-xs font-medium rounded text-ink transition-colors"
                >
                  Buscar
                </button>
              </form>
            </div>

            <div className="overflow-y-auto flex-1 p-0 pb-24 md:pb-0">
              {isLoading ? (
                <div className="p-8 text-center text-ink-muted animate-pulse">
                  Cargando productos...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-brand-pink">
                  Error: {error}
                </div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-ink-muted">
                  No se encontraron productos.
                </div>
              ) : (
                <ul className="divide-y divide-border-light">
                  {products.map(product => {
                    const cartItem = selectedProducts.find(
                      p => p.IdProducto === product.IdProducto,
                    )
                    const isSelected = !!cartItem
                    return (
                      <ProductCard
                        key={product.IdProducto}
                        product={product}
                        isSelected={isSelected}
                        onToggle={toggleProductSelection}
                        quantity={cartItem?.quantity}
                        onUpdateQuantity={updateQuantity}
                      />
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile Toggle Bar */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white border-t border-border-light p-4 md:hidden z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 ${
              isSummaryOpen ? 'translate-y-full' : 'translate-y-0'
            }`}
          >
            <div className="flex justify-between items-center max-w-spacing-middle mx-auto">
              <div className="flex flex-col">
                <span className="text-sm text-ink-muted">
                  {totalItems} items
                </span>
                <span className="text-xl font-bold text-primary">
                  S/ {totalAmount.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setIsSummaryOpen(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow-sm active:scale-95 transition-transform"
              >
                Ver Pedido
              </button>
            </div>
          </div>

          {/* Mobile Backdrop */}
          {isSummaryOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm animate-fade-in"
              onClick={() => setIsSummaryOpen(false)}
            />
          )}

          {/* Selected Products / Order Summary */}
          <div
            className={`
            bg-white flex flex-col
            fixed bottom-0 left-0 right-0 z-50
            h-[85vh] rounded-t-2xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]
            transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1)
            ${isSummaryOpen ? 'translate-y-0' : 'translate-y-full'}
            md:translate-y-0 md:static md:z-auto md:h-[calc(100vh-140px)] md:w-1/3 md:rounded-xl md:shadow-sm md:border md:border-border-light
          `}
          >
            {/* Mobile Drag Handle / Header */}
            <div
              className="md:hidden flex flex-col items-center pt-3 pb-2 border-b border-border-light cursor-pointer"
              onClick={() => setIsSummaryOpen(false)}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-3"></div>
              <h3 className="font-bold text-heading">Tu Pedido</h3>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block p-6 border-b border-border-light bg-surface">
              <h3 className="text-xl font-bold text-heading">
                Resumen del Pedido
              </h3>
              <p className="text-sm text-ink-muted mt-1">
                {selectedProducts.length}{' '}
                {selectedProducts.length === 1
                  ? 'producto seleccionado'
                  : 'productos seleccionados'}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selectedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-ink-muted opacity-60">
                  <svg
                    className="w-16 h-16 mb-4 text-border"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="text-center">
                    Seleccione productos de la lista
                    <br />
                    para agregarlos al pedido
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {selectedProducts.map((product, index) => (
                    <CartItemComponent
                      key={`${product.IdProducto}-${index}`}
                      product={product}
                      onToggle={toggleProductSelection}
                      onUpdateQuantity={updateQuantity}
                      onUpdateObservacion={updateObservacion}
                    />
                  ))}
                </ul>
              )}
            </div>

            <div className="p-6 border-t border-border-light bg-surface">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-ink-muted">
                  Total
                </span>
                <span className="text-3xl font-bold text-primary">
                  S/ {totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                disabled={selectedProducts.length === 0 || isSubmitting}
                onClick={handleConfirmOrder}
                className="w-full bg-primary hover:bg-action-hover disabled:bg-action-disabled disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md active:scale-[0.98] flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar Pedido</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
