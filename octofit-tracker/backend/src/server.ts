import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import workoutsRouter from './routes/workouts.js'
import leaderboardRouter from './routes/leaderboard.js'

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

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', baseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/leaderboard', leaderboardRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Base URL: ${baseUrl}`)
})

export default app
