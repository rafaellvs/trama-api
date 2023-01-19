import { Router } from 'express'

import * as authController from '../controllers/auth.js'

const router = Router()

router.post('/login', authController.login)

router.post('/verify-token', authController.verifyToken)

export default router
