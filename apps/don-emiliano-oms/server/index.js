const express = require('express')
const sql = require('mssql')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: false, // Use true for Azure, false for local dev usually
    trustServerCertificate: true, // Change to false for production
  },
}

// Connect to Database
async function connectToDb() {
  try {
    await sql.connect(dbConfig)
    console.log('Connected to SQL Server')
  } catch (err) {
    console.error('Database connection failed:', err)
  }
}

connectToDb()

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { code } = req.body

  if (!code) {
    return res.status(400).json({ error: 'Code is required' })
  }

  try {
    // QUERY: Adjust the table name (USUARIO) and column name (CODIGO) as needed
    // We are looking for the ID_USUARIO based on the provided code
    const result =
      await sql.query`SELECT ID_USUARIO, NOMBRE FROM USUARIO WHERE CODIGO = ${code}`

    if (result.recordset.length > 0) {
      const user = result.recordset[0]
      res.json({
        success: true,
        userId: user.ID_USUARIO,
        name: user.NOMBRE,
      })
    } else {
      res.status(401).json({ success: false, message: 'Invalid code' })
    }
  } catch (err) {
    console.error('Query error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
