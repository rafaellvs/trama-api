import { Router } from 'express'

const router = Router()

router.all('*', (req, res, next) => {
  return next(new Error('404'))
})

export default router
