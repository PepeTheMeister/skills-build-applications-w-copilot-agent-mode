import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
const PORT = 8000

const codespaceName = process.env.CODESPACE_NAME
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', baseUrl })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Base URL: ${baseUrl}`)
})

export default app
