import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../types/Products'

interface CartItem extends Product {
  quantity: number
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const fetchOrder = useCallback(async (tableId: string) => {
    try {
      // API call to get existing order details
      const response = await fetch(`/api/Pedido/DetalleMesa/?IdMesa=${tableId}`)

      if (response.ok) {
        const data = await response.json()
        const apiItems = data.Data || []

        // Map API response to internal CartItem format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedItems: CartItem[] = apiItems.map((item: any) => ({
          IdProducto: 0,
          Descripcion: item.Producto,
          Precio: item.Precio,
          Combo: 0,
          quantity: item.Cantidad,
        }))

        setSelectedProducts(mappedItems)
      } else {
        throw new Error('API failed')
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      setSelectedProducts([])
    }
  }, [])

  useEffect(() => {
    const tableId = localStorage.getItem('oms_tableId')
    // Check auth
    if (!localStorage.getItem('oms_auth')) {
      navigate('/')
    } else if (!tableId) {
      navigate('/tables')
    } else {
      fetchOrder(tableId)
    }
  }, [navigate, fetchOrder])

  const getProducts = useCallback(async (description: string = '') => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/Pedido/BuscarProductos?Descripcion=${encodeURIComponent(
          description,
        )}`,
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = (await response.json()) as { Data: Product[] }
      setProducts(data.Data ?? [])
    } catch (error) {
      console.error('Error trying to retrieve list of products', error)
      if (error instanceof Error) setError(error.message)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounce search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      getProducts(searchTerm)
    }, 500) // 500ms debounce delay

    return () => clearTimeout(timer)
  }, [searchTerm, getProducts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Immediate search on submit
    getProducts(searchTerm)
  }

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.IdProducto === product.IdProducto)
      if (exists) {
        return prev.filter(p => p.IdProducto !== product.IdProducto)
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId: number, delta: number) => {
    setSelectedProducts(prev =>
      prev.map(item => {
        if (item.IdProducto === productId) {
          const newQuantity = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const handleLogout = () => {
    localStorage.removeItem('oms_auth')
    localStorage.removeItem('oms_userId')
    localStorage.removeItem('oms_tableId')
    navigate('/')
  }

  const fetchOperacion = async () => {
    try {
      const response = await fetch('/api/Pedido/VerOperacion', {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        return data.Data
      }
    } catch (e) {
      console.error('Error fetching operation details', e)
    }
    return null
  }

  const handleConfirmOrder = async () => {
    if (selectedProducts.length === 0) return

    setIsSubmitting(true)

    // Actual Implementation with JSON Payload (Standard)
    try {
      const operacionData = await fetchOperacion()
      if (!operacionData || !operacionData.ID_OPERACION) {
        throw new Error(
          'No se pudo validar la sesión de operación. Recargue la página.',
        )
      }

      const operacionId = operacionData.ID_OPERACION

      const total = selectedProducts.reduce(
        (sum, p) => sum + p.Precio * p.quantity,
        0,
      )

      // Retrieve IDs from storage
      const storedUserId = localStorage.getItem('oms_userId')
      const storedTableId = localStorage.getItem('oms_tableId')

      const userId = storedUserId ? parseInt(storedUserId, 10) : 0
      const tableId = storedTableId ? parseInt(storedTableId, 10) : 0

      const payload = {
        Cab: {
          ID_COMANDA: 0,
          FECHA: new Date().toISOString(),
          HORA: new Date().toLocaleTimeString('en-US', { hour12: false }),
          ID_MESA: tableId,
          ID_MOZO: userId,
          ID_OPERACION: operacionId,
          ID_USUARIO: userId,
          MESA: `Mesa ${tableId}`,
          OBSERVACON: '',
          TOTAL: total,
          ESTADO: 'P',
        },
        M: {
          PDESCUENTO: 0,
          TOTAL: total,
          tipo: 'V',
          Id: 0,
          LIBRE: 1,
          MESA: `Mesa ${tableId}`,
          NPERSONAS: 1,
          CLIENTE: '',
          CUENTEA: 0,
          DESCUENTO: 0,
          Estado: 4,
          ID_MESA: tableId,
          ID_OPERACION: operacionId,
          ID_PERSONAL: 0,
          ID_USUARIO: userId,
        },
        Det: selectedProducts.map(p => ({
          ID_COMANDA: 0,
          CANTIDAD: p.quantity,
          COMBO: p.Combo,
          ID_PRODUCTO: p.IdProducto,
          OBSERVACION: '',
          PUNIT: p.Precio,
          TOTAL: p.Precio * p.quantity,
          ID_PRODUCOMBO: 0,
          CANTIDADCOMBO: 0,
          CAMBIO: 'P',
        })),
      }
      console.log(payload)

      // Using standard JSON POST
      // const response = await fetch('/api/Pedido/RegistrarComanda', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // })
      //
      // if (response.ok) {
      //   // Success
      //   alert('Pedido enviado correctamente!')
      //   setSelectedProducts([]) // Clear cart
      //   setIsSummaryOpen(false) // Close mobile sheet
      // } else {
      //   // Fallback for legacy jQuery-style endpoints that might not accept JSON body
      //   // This is a "safety net" retry logic if JSON fails, attempting the 'standard' MVC form post
      //   // logic often found in older .NET apps.
      //   console.warn('JSON submit failed, trying legacy form format...')
      //
      //   // ... legacy retry logic would go here if strict compatibility is needed
      //   throw new Error('Error en el servidor: ' + response.statusText)
      // }
    } catch (e) {
      console.error(e)
      if (e instanceof Error) setError(e.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalAmount = selectedProducts.reduce(
    (sum, p) => sum + p.Precio * p.quantity,
    0,
  )
  const totalItems = selectedProducts.reduce((sum, p) => sum + p.quantity, 0)

  return (
    <div className="min-h-screen bg-[var(--color-surface-hover)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[var(--color-border-light)] sticky top-0 z-50">
        <div className="max-w-[var(--spacing-middle)] mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/active-tables')}
              className="p-2 -ml-2 text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] rounded-full transition-colors"
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
            <h1 className="text-xl font-bold text-[var(--color-heading)] hidden sm:block">
              Don Emiliano{' '}
              <span className="text-[var(--color-primary)]">OMS</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-[var(--spacing-middle)] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Product List */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-[var(--color-border-light)] overflow-hidden flex flex-col h-[calc(100vh-140px)]">
            <div className="px-6 py-4 border-b border-[var(--color-border-light)] space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[var(--color-heading)]">
                  Productos
                </h2>
                <span className="text-sm text-[var(--color-ink-muted)]">
                  {products.length} encontrados
                </span>
              </div>

              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar por descripción..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                />
                <svg
                  className="w-5 h-5 text-[var(--color-ink-muted)] absolute left-3 top-2.5"
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
                  className="absolute right-2 top-1.5 px-3 py-1 bg-[var(--color-surface-hover)] hover:bg-[var(--color-border-light)] text-xs font-medium rounded text-[var(--color-ink)] transition-colors"
                >
                  Buscar
                </button>
              </form>
            </div>

            {/* Added pb-24 for mobile bottom bar clearance */}
            <div className="overflow-y-auto flex-1 p-0 pb-24 md:pb-0">
              {isLoading ? (
                <div className="p-8 text-center text-[var(--color-ink-muted)] animate-pulse">
                  Cargando productos...
                </div>
              ) : error ? (
                <div className="p-8 text-center text-[var(--color-brand-pink)]">
                  Error: {error}
                </div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-[var(--color-ink-muted)]">
                  No se encontraron productos.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border-light)]">
                  {products.map(product => {
                    const isSelected = selectedProducts.some(
                      p => p.IdProducto === product.IdProducto,
                    )
                    return (
                      <li
                        key={product.IdProducto}
                        onClick={() => toggleProductSelection(product)}
                        className={`p-4 cursor-pointer transition-colors duration-150 flex justify-between items-center group select-none
                          ${
                            isSelected
                              ? 'bg-[var(--color-surface-mint)]'
                              : 'hover:bg-[var(--color-surface-hover)]'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                            ${
                              isSelected
                                ? 'bg-[var(--color-brand-green)] border-[var(--color-brand-green)]'
                                : 'border-[var(--color-border)] group-hover:border-[var(--color-primary)]'
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="w-3.5 h-3.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <span
                              className={`block font-medium transition-colors ${
                                isSelected
                                  ? 'text-[var(--color-brand-deep)]'
                                  : 'text-[var(--color-heading)]'
                              }`}
                            >
                              {product.Descripcion}
                            </span>
                            <span className="text-xs text-[var(--color-ink-muted)]">
                              ID: {product.IdProducto}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-[var(--color-ink)]">
                          S/ {product.Precio.toFixed(2)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile Toggle Bar */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border-light)] p-4 md:hidden z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 ${
              isSummaryOpen ? 'translate-y-full' : 'translate-y-0'
            }`}
          >
            <div className="flex justify-between items-center max-w-[var(--spacing-middle)] mx-auto">
              <div className="flex flex-col">
                <span className="text-sm text-[var(--color-ink-muted)]">
                  {totalItems} items
                </span>
                <span className="text-xl font-bold text-[var(--color-primary)]">
                  S/ {totalAmount.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setIsSummaryOpen(true)}
                className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-semibold shadow-sm active:scale-95 transition-transform"
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
            /* Mobile: Fixed Bottom Sheet */
            fixed bottom-0 left-0 right-0 z-50
            h-[85vh] rounded-t-2xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]
            transition-transform duration-300 cubic-bezier(0.32, 0.72, 0, 1)
            ${isSummaryOpen ? 'translate-y-0' : 'translate-y-[100%]'}

            /* Desktop: Sidebar */
            md:translate-y-0 md:static md:z-auto md:h-[calc(100vh-140px)] md:w-1/3 md:rounded-xl md:shadow-sm md:border md:border-[var(--color-border-light)]
          `}
          >
            {/* Mobile Drag Handle / Header */}
            <div
              className="md:hidden flex flex-col items-center pt-3 pb-2 border-b border-[var(--color-border-light)] cursor-pointer"
              onClick={() => setIsSummaryOpen(false)}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-3"></div>
              <h3 className="font-bold text-[var(--color-heading)]">
                Tu Pedido
              </h3>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block p-6 border-b border-[var(--color-border-light)] bg-[var(--color-surface)]">
              <h3 className="text-xl font-bold text-[var(--color-heading)]">
                Resumen del Pedido
              </h3>
              <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                {selectedProducts.length}{' '}
                {selectedProducts.length === 1
                  ? 'producto seleccionado'
                  : 'productos seleccionados'}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selectedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--color-ink-muted)] opacity-60">
                  <svg
                    className="w-16 h-16 mb-4 text-[var(--color-border)]"
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
                    <li
                      key={`${product.IdProducto}-${index}`}
                      className="flex flex-col bg-[var(--color-surface-hover)] p-3 rounded-lg border border-[var(--color-border-light)] animate-fade-in-right"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-2">
                          <span className="text-sm font-medium text-[var(--color-heading)] line-clamp-2">
                            {product.Descripcion}
                          </span>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            toggleProductSelection(product)
                          }}
                          className="text-xs text-[var(--color-brand-pink)] hover:text-[var(--color-action-pressed)] p-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border-light)]">
                        <div className="flex items-center gap-3 bg-white rounded-md border border-[var(--color-border-light)] px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(product.IdProducto, -1)
                            }
                            className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] disabled:opacity-30"
                            disabled={product.quantity <= 1}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(product.IdProducto, 1)
                            }
                            className="text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="block text-xs text-[var(--color-ink-muted)]">
                            S/ {product.Precio.toFixed(2)} c/u
                          </span>
                          <span className="font-bold text-[var(--color-ink)] text-sm">
                            S/ {(product.Precio * product.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-6 border-t border-[var(--color-border-light)] bg-[var(--color-surface)]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-[var(--color-ink-muted)]">
                  Total
                </span>
                <span className="text-3xl font-bold text-[var(--color-primary)]">
                  S/ {totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                disabled={selectedProducts.length === 0 || isSubmitting}
                onClick={handleConfirmOrder}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-action-hover)] disabled:bg-[var(--color-action-disabled)] disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md active:scale-[0.98] flex justify-center items-center gap-2"
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
