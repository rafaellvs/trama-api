import app from './app.js'

app.listen(process.env.PORT, () => {
  console.log(`Trama API listening at port ${process.env.PORT}...`)
})
