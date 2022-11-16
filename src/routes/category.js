import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Category GET')
})

export default router