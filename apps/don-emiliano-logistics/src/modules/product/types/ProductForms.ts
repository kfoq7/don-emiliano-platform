import { Product } from './Product'

/**
 * Create product form interface based on Product DTO.
 * Extends Product with categoryId as required field and makes availability fields optional.
 */
export interface CreateProduct
  extends
    Omit<Product, 'id' | 'category' | 'isAvailable' | 'isStockAvailabel'>,
    Partial<Pick<Product, 'isAvailable' | 'isStockAvailabel'>> {
  categoryId: number
}

export interface UpdateProduct extends Partial<CreateProduct> {}
