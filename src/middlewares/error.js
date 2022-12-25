
const errorMiddleware = (error, req, res, next) => {
  if (error.name === 'TypeError') return res.status(400).send({ error: error.message })
  if (error.message === '404') return res.status(404).send({ error: 'Not Found' })

  return res.status(500).send(error.message)
}

export { errorMiddleware }
