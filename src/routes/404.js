import { Router } from 'express'

const router = Router()

router.all('*', (req, res, next) => {
  return next(new Error('Route not found', { cause: '404' }))
})

export default router
