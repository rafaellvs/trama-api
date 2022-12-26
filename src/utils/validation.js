import validator from 'express-validator'
const { validationResult } = validator

// returns TypeError with first error message from express-validator
const validateReqParams = (req) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new TypeError(`Error: ${errors.array()[0].msg}`)
  }

  return false
}

export { validateReqParams }
