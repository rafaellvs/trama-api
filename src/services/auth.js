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
        resolve(result.getIdToken())
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
            ...userData,
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

export {
  verifyJwt,
  authenticateUser,
  createUser,
  confirmUserAccount,
  resendConfirmationCode,
}
