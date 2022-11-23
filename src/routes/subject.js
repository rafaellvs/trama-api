import { Router } from 'express'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/subject.js'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const subject = await getById(id)

  return res.send(subject)
})

router.get('/', async (req, res) => {
  const subjects = await getAll()

  return res.send(subjects)
})

router.post('/create', async (req, res) => {
  const { name, description, categoryId } = req.body

  if (!name) return res.status(400).send('name is required.')
  if (!categoryId) return res.status(400).send('categoryId is required.')

  const subject = await create(name, description, categoryId)

  return res.send(subject)
})

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params
  const { name, description, categoryId } = req.body

  const response = await update(id, name, description, categoryId)

  return res.send(response)
})

router.delete('/remove/:id', async (req, res) => {
  const { id } = req.params

  const response = await remove(id)

  return res.send(response)
})

export default router
