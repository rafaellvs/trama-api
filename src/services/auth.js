import { CognitoJwtVerifier } from 'aws-jwt-verify'
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
  ClientId: process.env.COGNITO_CLIENT_ID,
  UserPoolId: process.env.COGNITO_USERPOOL_ID,
})

const verifyJwt = async ({ token }) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USERPOOL_ID,
    clientId: process.env.COGNITO_CLIENT_ID,
    tokenUse: 'id',
  })

  return await verifier.verify(token)
}

const authenticateUser = async (userData) => {
  const { username, password } = userData

  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  const authParams = new AuthenticationDetails({
    Username: username,
    Password: password,
  })

  return await new Promise((resolve, reject) => {
    user.authenticateUser(authParams, {
      onSuccess: (result) => {
        const idToken = result.getIdToken()
        resolve({
          id: idToken.payload.sub,
          username: idToken.payload['cognito:username'],
          email: idToken.payload.email,
          email_verified: idToken.payload.email_verified,
          jwtToken: idToken.jwtToken,
        })
      },
      onFailure: (err) => {
        reject(err)
      },
    })
  })
}

const createUser = async (userData) => {
  const { username, email, password } = userData

  const userAttributes = []
  const userEmail = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  })
  userAttributes.push(userEmail)

  return await new Promise((resolve, reject) => {
    userPool.signUp(
      username,
      password,
      userAttributes,
      [],
      function (err, result) {
        if (err !== null && err !== undefined) reject(err)

        else if (result !== undefined) {
          resolve({
            id: result.userSub,
            username,
            email,
          })
        }
      })
  })
}

const confirmUserAccount = async ({ username, code }) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return await new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, function (err, result) {
      if (err !== null && err !== undefined) reject(err)
      else if (result !== undefined) {
        resolve(result)
      }
    })
  })
}

const resendConfirmationCode = async ({ username }) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return await new Promise((resolve, reject) => {
    user.resendConfirmationCode(function (err, result) {
      if (err !== null && err !== undefined) reject(err.message)
      else if (result !== undefined) {
        resolve(result.Destination)
      }
    })
  })
}

const getCurrentUser = async ({ token }) => {
  try {
    const payload = await verifyJwt({ token })
    return {
      id: payload.sub,
      username: payload['cognito:username'],
      email: payload.email,
      email_verified: payload.email_verified,
    }
  } catch (err) {
    return null
  }
}

const sendForgotPasswordCode = async ({ username }) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return new Promise((resolve, reject) => {
    user.forgotPassword({
      onSuccess: data => resolve(data.CodeDeliveryDetails.Destination),
      onFailure: err => reject(err),
    })
  })
}

const confirmNewPassword = async ({ username, code, newPassword }) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  })

  return new Promise((resolve, reject) => {
    user.confirmPassword(code, newPassword, {
      onSuccess: success => resolve(success),
      onFailure: err => reject(err),
    })
  })
}

export {
  verifyJwt,
  authenticateUser,
  createUser,
  confirmUserAccount,
  resendConfirmationCode,
  getCurrentUser,
  sendForgotPasswordCode,
  confirmNewPassword,
}
