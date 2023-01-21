import { validateReqParams } from '../utils/validation.js'

import {
  authenticateUser,
  createUser,
  verifyJwt,
  confirmUserAccount,
  resendConfirmationCode,
} from '../services/auth.js'

const verifyToken = async (req, res, next) => {
  try {
    validateReqParams(req)

    const { token } = req.body
    await verifyJwt({ token })
    res.status(200).send()
  } catch (err) {
    next(new Error(`Unauthorized: ${err.message}`, { cause: '401' }))
  }
}

const login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    validateReqParams(req)

    const response = await authenticateUser({ username, password })
    res.cookie(
      process.env.COGNITO_JWTID_COOKIE_NAME,
      response.jwtToken,
      { httpOnly: true }
    )
    const responseToSend = {
      id: response.payload.sub,
      username: response.payload['cognito:username'],
      email: response.payload.email,
      email_verified: response.payload.email_verified,
      jwtToken: response.jwtToken,
    }
    return res.send(responseToSend)
  } catch (err) {
    return next(err)
  }
}

const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    validateReqParams(req)

    const response = await createUser({ username, email, password })
    const responseToSend = {
      id: response.id,
      username: response.username,
      email: response.email,
    }
    res.send(responseToSend)
  } catch (err) {
    next(err)
  }
}

const confirmAccount = async (req, res, next) => {
  const { username, code } = req.body

  try {
    validateReqParams(req)

    const response = await confirmUserAccount({ username, code })
    return res.send(response)
  } catch (err) {
    return next(err)
  }
}

const resendCode = async (req, res, next) => {
  const { username } = req.body

  try {
    validateReqParams(req)

    const response = await resendConfirmationCode({ username })
    return res.send(response)
  } catch (err) {
    return next(err)
  }
}

export {
  login,
  verifyToken,
  signup,
  confirmAccount,
  resendCode,
}
