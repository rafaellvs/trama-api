const errorMiddleware = (error, req, res, next) => {
  if (error.name === 'TypeError') return res.status(400).send({ error: error.message })
  if (error.cause === '404') return res.status(404).send({ error: error.message })

  return res.status(500).send({ error: error.message })
}

export { errorMiddleware }
