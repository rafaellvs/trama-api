import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import subjectRouter from './routes/subject.js'
import categoryRouter from './routes/category.js'
import refsRouter from './routes/refs.js'
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
app.use(userAuthMiddleware)
app.use('/subject', subjectRouter)
app.use('/category', categoryRouter)
app.use('/refs', refsRouter)
app.use(notFoundRouter)
app.use(errorMiddleware)

export default app
