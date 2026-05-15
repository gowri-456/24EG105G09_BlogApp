import 'dotenv/config'  // First line to load env variables
import exp from 'express'
import { connect } from 'mongoose'
import { userApp } from './APIs/UserAPI.js'
import { authorApp } from './APIs/AuthorAPI.js'
import { adminApp } from './APIs/AdminAPI.js'
import { commonApp } from './APIs/CommonAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = exp()

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
      ]
      // Allow any vercel.app subdomain
      const vercelPattern = /^https:\/\/.*\.vercel\.app$/

      if (!origin || allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)

// Middleware
app.use(cookieParser())
app.use(exp.json())

// API Routes
app.use('/user-api', userApp)
app.use('/author-api', authorApp)
app.use('/admin-api', adminApp)
app.use('/auth', commonApp)

// Root API Route (Fixes the Render Health Check 404)
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Blog App Backend API",
    status: "Healthy and Running"
  })
})

// 1. Start Express Server immediately so Render doesn't time out
const port = process.env.PORT || 4000
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server listening on port ${port}`)
})

// 2. Connect to MongoDB asynchronously
const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is not defined in the environment variables.")
    }
    await connect(process.env.DB_URL, { family: 4 })
    console.log('✅ DB Connected Successfully')
  } catch (err) {
    console.error('❌ CRITICAL: Error in DB Connect ->', err.message)
  }
}

connectDB()

// Handle invalid paths
app.use((req, res, next) => {
  console.log(`404 - Invalid path: ${req.url}`)
  res.status(404).json({ message: `path ${req.url} is invalid` })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error Name:', err.name)
  console.error(err)

  // ValidationError
  if (err.name === 'ValidationError') {
    return res
      .status(400)
      .json({ message: 'Error occurred', error: err.message })
  }
  
  // CastError
  if (err.name === 'CastError') {
    return res
      .status(400)
      .json({ message: 'Error occurred', error: err.message })
  }

  // General server-side errors
  res.status(500).json({ message: 'Error occurred', error: err.message })
})