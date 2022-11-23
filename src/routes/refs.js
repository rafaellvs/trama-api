import { Router } from 'express'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/refs.js'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const ref = await getById(id)

  return res.send(ref)
})

router.get('/', async (req, res) => {
  const refs = await getAll()

  return res.send(refs)
})

router.post('/create', async (req, res) => {
  const { content, subjectId } = req.body

  if (!content) return res.status(400).send('content is required.')
  if (!subjectId) return res.status(400).send('subjectId is required.')

  const ref = await create(content, subjectId)

  return res.send(ref)
})

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params
  const { content, subjectId } = req.body

  const ref = await update(id, content, subjectId)

  return res.send(ref)
})

router.delete('/remove/:id', async (req, res) => {
  const { id } = req.params

  const ref = await remove(id)

  return res.send(ref)
})

export default router
