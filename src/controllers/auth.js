import { authenticateUser } from '../services/auth.js'

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

export { login }
