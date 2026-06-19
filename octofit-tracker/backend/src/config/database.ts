import mongoose from 'mongoose'
import 'dotenv/config'

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

export async function connectDB() {
  try {
    await mongoose.connect(mongoUri)
    console.log('✓ Connected to MongoDB')
    return mongoose
  } catch (err) {
    console.error('✗ MongoDB connection error:', err)
    throw err
  }
}

export function getMongoUri() {
  return mongoUri
}

export function disconnectDB() {
  return mongoose.disconnect()
}
