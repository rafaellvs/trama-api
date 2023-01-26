import { validateReqParams } from '../utils/validation.js'

import {
  authenticateUser,
  createUser,
  verifyJwt,
  confirmUserAccount,
  resendConfirmationCode,
  getCurrentUser,
  sendForgotPasswordCode,
  confirmNewPassword,
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
    return res.send(response)
  } catch (err) {
    return next(err)
  }
}

const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    validateReqParams(req)

    const response = await createUser({ username, email, password })
    res.send(response)
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

const user = async (req, res, next) => {
  const token = req.cookies[process.env.COGNITO_JWTID_COOKIE_NAME]

  try {
    const response = await getCurrentUser({ token })
    return res.status(200).send(response)
  } catch (err) {
    return next(err)
  }
}

const logout = async (req, res, next) => {
  res.clearCookie(process.env.COGNITO_JWTID_COOKIE_NAME)
  res.status(200).end()
}

const forgotPassword = async (req, res, next) => {
  const { username } = req.body

  try {
    validateReqParams(req)

    const response = await sendForgotPasswordCode({ username })
    console.log(response)
    return res.status(200).send(response)
  } catch (err) {
    return next(err)
  }
}

const confirmResetPassword = async (req, res, next) => {
  const { username, code, newPassword } = req.body

  try {
    validateReqParams(req)

    const response = await confirmNewPassword({ username, code, newPassword })
    return res.status(200).send(response)
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
  user,
  logout,
  forgotPassword,
  confirmResetPassword,
}
