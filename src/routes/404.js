import { Router } from 'express'

const router = Router()

router.all('*', (req, res, next) => {
  return res.status(404).send({ error: 'Página não encontrada.' })
})

export default router
