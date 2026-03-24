import type { APIRoute } from 'astro'

// Validate Peruvian phone number (9 digits starting with 9)
function isValidPeruvianPhone(phone: string): boolean {
  return /^9\d{8}$/.test(phone)
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json()
    const { phone, redirect = '/' } = body

    // Validate phone format
    if (!phone || !isValidPeruvianPhone(phone)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Numero de telefono invalido',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Set guest phone session cookie (24 hours expiry)
    cookies.set('guest_phone', phone, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return new Response(
      JSON.stringify({
        success: true,
        redirect,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Phone session error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error al procesar la solicitud',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
