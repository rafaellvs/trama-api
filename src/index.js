import express from 'express'
import * as dotenv from 'dotenv'

import subjectRouter from './routes/subject.js'
import categoryRouter from './routes/category.js'
import refsRouter from './routes/refs.js'

import { errorHandler } from './helpers/errors.js'

dotenv.config()
const app = express()

app.use(express.json())

app.use('/subject', subjectRouter)
app.use('/category', categoryRouter)
app.use('/refs', refsRouter)

app.use(errorHandler)

app.get('*', (req, res) => {
  res.status(404).send('Route not found.')
})

app.listen(process.env.PORT, () => {
  console.log(`API listening at port ${process.env.PORT}...`)
})
