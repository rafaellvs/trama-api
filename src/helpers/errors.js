import validator from 'express-validator'
const { validationResult } = validator

const errorHandler = (error, req, res, next) => {
  if (error.name === 'TypeError') return res.status(400).send({ error: error.message })
  if (error.message === '404') return res.status(404).send({ error: 'Not Found' })

  return res.status(500).send(error.message)
}

// returns TypeError with first error message from express-validator
const validateAndParseError = (req) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return new TypeError(`Error: ${errors.array()[0].msg}`)
  }

  return false
}

export { errorHandler, validateAndParseError }
