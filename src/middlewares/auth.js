import { verifyJwt } from '../services/auth.js'

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies[process.env.COGNITO_JWTID_COOKIE_NAME]
    await verifyJwt({ token })
    next()
  } catch (err) {
    next(new Error(`Unauthorized: ${err.message}`, { cause: '401' }))
  }
}

export { userAuthMiddleware }
