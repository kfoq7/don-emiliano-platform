interface UserAuth {
  userId: string
  name: string
}

export const login = async (code: string): Promise<UserAuth> => {
  try {
    const response = await fetch(`/server/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code.trim() }),
    })

    const data = (await response.json()) as {
      data: UserAuth
      success: boolean
      message?: string
    }
  } catch (error) {}
}
