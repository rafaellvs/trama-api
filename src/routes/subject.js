import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Subject GET')
})

export default router
