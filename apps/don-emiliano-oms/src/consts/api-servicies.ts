export const API_APP =
  import.meta.env.ENVIRONMENT === 'development'
    ? '/api'
    : import.meta.env.PRODC_API_URL

export const API_SERVER =
  import.meta.env.ENVIRONMENT === 'development'
    ? '/server'
    : import.meta.env.PRODC_SERVER_URL
