import { verifyJwt } from '../services/auth.js'

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies[process.env.COGNITO_JWTID_COOKIE_NAME]
    const payload = await verifyJwt({ token })
    res.locals.user_id = payload.sub
    next()
  } catch (err) {
    next(err)
  }
}

export { userAuthMiddleware }
