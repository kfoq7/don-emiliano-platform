import type { APIRoute } from 'astro'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const productsPath = path.join(process.cwd(), 'src/lib/products.json')

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params
  const productId = Number(id)

  if (isNaN(productId)) {
    return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await request.json()
    const { isStockAvailable } = body

    if (typeof isStockAvailable !== 'boolean') {
      return new Response(
        JSON.stringify({ error: 'Invalid body: isStockAvailable must be a boolean' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const fileContent = await readFile(productsPath, 'utf-8')
    const products = JSON.parse(fileContent)

    const productIndex = products.findIndex((p: any) => p.id === productId)

    if (productIndex === -1) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Update the product
    products[productIndex].isStockAvailable = isStockAvailable

    // Write back to file
    await writeFile(productsPath, JSON.stringify(products, null, 2), 'utf-8')

    return new Response(JSON.stringify(products[productIndex]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return new Response(JSON.stringify({ error: 'Error updating product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
