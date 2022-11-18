import express from 'express'
import * as dotenv from 'dotenv'

import subjectRouter from './routes/subject.js'
import categoryRouter from './routes/category.js'
import todoRouter from './routes/todo.js'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('Jansen')
})

app.use('/subject', subjectRouter)
app.use('/category', categoryRouter)
app.use('/todo', todoRouter)

app.listen(3000, () => {
  console.log('API listening at port 3000...')
})
