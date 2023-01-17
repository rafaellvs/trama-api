import { CognitoJwtVerifier } from 'aws-jwt-verify'
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
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

const authenticateUser = async ({ username, password }) => {
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

export { authenticateUser, verifyJwt }
