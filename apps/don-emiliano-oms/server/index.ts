import 'dotenv/config'

import express from 'express'
import sql from 'mssql'
import cors from 'cors'

const PORT = process.env.PORT ?? 8000

const app = express()

app.use(cors())
app.use(express.json())

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER ?? 'localhost',
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: false, // Use true for Azure, false for local dev usually
    trustServerCertificate: true, // Change to false for production
  },
}

async function connectToDb() {
  try {
    await sql.connect(dbConfig)
    console.log('Connected to SQL Server')
  } catch (err) {
    console.error('Database connection failed:', err)
  }
}

connectToDb()

app.post('/api/login', async (req, res) => {
  const { code } = req.body

  if (!code) {
    return res.status(400).json({ error: 'Code is required' })
  }

  try {
    const result =
      await sql.query`SELECT ID_PERSONAL, NOMBRE FROM TBL_PERSONAL WHERE CLAVE = ${code} AND ACTIVO = 1`

    if (result.recordset.length > 0) {
      const user = result.recordset[0]
      return res.json({
        success: true,
        data: {
          userId: user.ID_PERSONAL,
          name: user.NOMBRE,
        },
      })
    }

    res.status(401).json({ success: false, message: 'Invalid code' })
  } catch (error) {
    console.error('Query error', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
