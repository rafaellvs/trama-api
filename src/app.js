import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import subjectRouter from './routes/subject.js'
import categoryRouter from './routes/category.js'
import refsRouter from './routes/refs.js'
import notFoundRouter from './routes/404.js'

import { errorHandler } from './helpers/errors.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/subject', subjectRouter)
app.use('/category', categoryRouter)
app.use('/refs', refsRouter)
app.use(notFoundRouter)

app.use(errorHandler)

export default app
