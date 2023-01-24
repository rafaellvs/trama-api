import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import recordRouter from './routes/record.js'
import categoryRouter from './routes/category.js'
import refsRouter from './routes/ref.js'
import authRouter from './routes/auth.js'
import notFoundRouter from './routes/404.js'

import { errorMiddleware } from './middlewares/error.js'
import { userAuthMiddleware } from './middlewares/auth.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))

app.use('/auth', authRouter)
app.use('/record', userAuthMiddleware, recordRouter)
app.use('/category', userAuthMiddleware, categoryRouter)
app.use('/ref', userAuthMiddleware, refsRouter)
app.use(notFoundRouter)
app.use(errorMiddleware)

export default app
