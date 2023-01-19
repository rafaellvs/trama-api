import { authenticateUser, verifyJwt } from '../services/auth.js'

const login = async (req, res, next) => {
  const { username, password } = req.body

  try {
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

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.body
    await verifyJwt({ token })
    res.status(200).send()
  } catch (err) {
    next(new Error(`Unauthorized: ${err.message}`, { cause: '401' }))
  }
}

export { login, verifyToken }
