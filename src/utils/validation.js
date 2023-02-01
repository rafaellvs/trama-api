import validator from 'express-validator'
import { ValidationError } from '../middlewares/error.js'

const { validationResult } = validator

// returns TypeError with first error message from express-validator
const validateReqParams = (req) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new ValidationError(`${errors.array()[0].msg}`)
  }

  return false
}

export { validateReqParams }
