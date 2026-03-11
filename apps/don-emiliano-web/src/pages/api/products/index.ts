import type { APIRoute } from 'astro'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const GET: APIRoute = async () => {
  try {
    const productsPath = path.join(process.cwd(), 'src/lib/products.json')
    const fileContent = await readFile(productsPath, 'utf-8')
    const products = JSON.parse(fileContent)

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error loading products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
