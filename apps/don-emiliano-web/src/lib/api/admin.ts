const API_URL = import.meta.env.PUBLIC_API_URL

/**
 * API service for admin operations.
 *
 * Expected backend endpoints:
 *
 * === Products ===
 * GET    /products                         -> Product[] (with category relation)
 * GET    /products/categories              -> Category[] (with products nested)
 * PATCH  /products/:id/availability        -> Product (toggle isAvailable)
 *   Body: { isAvailable: boolean }
 *
 * === Business Hours ===
 * GET    /business-hours                   -> BusinessHours[]
 * PUT    /business-hours/:id               -> BusinessHours
 *   Body: { openTime: string | null, closeTime: string | null, isClosed: boolean }
 * POST   /business-hours/seed              -> BusinessHours[] (seeds default 7-day schedule)
 *
 * === Expected DB Schema ===
 *
 * Table: business_hours
 * | Column      | Type         | Constraints                          |
 * |-------------|------------- |--------------------------------------|
 * | id          | int (PK)     | auto-increment                       |
 * | day_of_week | smallint     | NOT NULL, 0=Domingo .. 6=Sabado      |
 * | day_name    | varchar(20)  | NOT NULL                             |
 * | open_time   | time         | nullable (e.g. '07:00')              |
 * | close_time  | time         | nullable (e.g. '15:00')              |
 * | is_closed   | boolean      | NOT NULL, default false              |
 * | created_at  | timestamp    | auto                                 |
 * | updated_at  | timestamp    | auto                                 |
 *
 * Table: product (already exists)
 * Relevant columns:
 * | is_available       | boolean | default true  |
 * | is_stock_available | boolean | default true  |
 */

// --- Types ---

export interface ProductCategory {
  id: number
  name: string
  products: AdminProduct[]
}

export interface AdminProduct {
  id: number
  name: string
  price: number
  isAvailable: boolean
  isStockAvailable: boolean
  category?: { id: number; name: string }
}

export interface BusinessHours {
  id: number
  dayOfWeek: number
  dayName: string
  openTime: string | null
  closeTime: string | null
  isClosed: boolean
}

// --- Products API ---

export async function fetchCategoriesWithProducts(): Promise<ProductCategory[]> {
  const response = await fetch(`${API_URL}/products/by-categories`)
  if (!response.ok) throw new Error('Error al obtener categorias')
  return response.json()
}

export async function fetchAllProducts(): Promise<AdminProduct[]> {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) throw new Error('Error al obtener productos')
  return response.json()
}

export async function toggleProductAvailability(
  productId: number,
  isStockAvailable: boolean,
): Promise<AdminProduct> {
  const response = await fetch(`${API_URL}/products/${productId}/availability`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isStockAvailable }),
  })
  if (!response.ok) throw new Error('Error al actualizar disponibilidad')
  return response.json()
}

// --- Business Hours API ---

export async function fetchBusinessHours(): Promise<BusinessHours[]> {
  const response = await fetch(`${API_URL}/business-hours`)
  if (!response.ok) throw new Error('Error al obtener horarios')
  return response.json()
}

export async function updateBusinessHours(
  id: number,
  data: { openTime: string | null; closeTime: string | null; isClosed: boolean },
): Promise<BusinessHours> {
  const response = await fetch(`${API_URL}/business-hours/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Error al actualizar horario')
  return response.json()
}

export async function seedBusinessHours(): Promise<BusinessHours[]> {
  const response = await fetch(`${API_URL}/business-hours/seed`, {
    method: 'POST',
  })
  if (!response.ok) throw new Error('Error al inicializar horarios')
  return response.json()
}
