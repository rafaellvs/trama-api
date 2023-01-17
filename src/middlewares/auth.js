import { verifyJwt } from '../services/auth.js'

const userAuthMiddleware = async (req, res, next) => {
  const cookie = req.cookies
  const token = cookie[process.env.COGNITO_JWTID_COOKIE_NAME]

  try {
    await verifyJwt({ token })
    return next(req)
  } catch (err) {
    res.status(401).send({ error: 'Unauthorized.' })
  }
}

export { userAuthMiddleware }
