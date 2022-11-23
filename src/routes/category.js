import { Router } from 'express'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/category.js'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const category = await getById(id)

  return res.send(category)
})

router.get('/', async (req, res) => {
  const categories = await getAll()

  return res.send(categories)
})

router.post('/create', async (req, res) => {
  const { name, description } = req.body

  if (!name) return res.status(400).send('Name is required.')

  const category = await create(name, description)

  return res.send(category)
})

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  const category = await update(id, name, description)

  return res.send(category)
})

router.delete('/remove/:id', async (req, res) => {
  const { id } = req.params

  const category = await remove(id)

  return res.send(category)
})

export default router
