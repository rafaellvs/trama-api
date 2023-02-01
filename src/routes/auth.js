import { Router } from 'express'
import validator from 'express-validator'

import * as authController from '../controllers/auth.js'

const router = Router()
const { body } = validator

router.post(
  '/login',
  body('username')
    .exists().withMessage('Field "username" is required.')
    .notEmpty().withMessage('Field "username" cannot be empty.'),
  body('password')
    .exists().withMessage('Field "password" is required.')
    .notEmpty().withMessage('Field "password" cannot be empty.'),
  authController.login
)

router.post(
  '/verify-token',
  body('token')
    .exists().withMessage('Field "token" is required.')
    .notEmpty().withMessage('Field "token" cannot be empty.'),
  authController.verifyToken
)

router.post(
  '/signup',
  body('username')
    .exists().withMessage('Field "username" is required.')
    .notEmpty().withMessage('Field "username" cannot be empty.'),
  body('email')
    .exists().withMessage('Field "email" is required.')
    .notEmpty().withMessage('Field "email" cannot be empty.'),
  body('password')
    .exists().withMessage('Field "password" is required.')
    .notEmpty().withMessage('Field "password" cannot be empty.'),
  authController.signup
)

router.post(
  '/confirm-account',
  body('username')
    .exists().withMessage('Field "username" is required.')
    .notEmpty().withMessage('Field "username" cannot be empty.'),
  body('code')
    .exists().withMessage('Field "code" is required.')
    .notEmpty().withMessage('Field "code" cannot be empty.'),
  authController.confirmAccount
)

router.post(
  '/resend-code',
  body('username')
    .exists().withMessage('Field "username" is required.')
    .notEmpty().withMessage('Field "username" cannot be empty.'),
  authController.resendCode
)

router.get(
  '/user',
  authController.user
)

router.get(
  '/logout',
  authController.logout
)

router.post(
  '/forgot-password',
  body('username')
    .exists().withMessage('Field "username" is required.')
    .notEmpty().withMessage('Field "username" cannot be empty.'),
  authController.forgotPassword
)

router.post(
  '/confirm-new-password',
  body('username')
    .exists().withMessage('Field "username" is required.')
    .notEmpty().withMessage('Field "username" cannot be empty.'),
  body('newPassword')
    .exists().withMessage('Field "newPassword" is required.')
    .notEmpty().withMessage('Field "newPassword" cannot be empty.'),
  body('code')
    .exists().withMessage('Field "code" is required.')
    .notEmpty().withMessage('Field "code" cannot be empty.'),
  authController.confirmResetPassword
)

export default router
