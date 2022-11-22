import { Router } from 'express'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/category.js'

const router = Router()

router.get('/:id', (req, res) => {
  const { id } = req.params

  if (typeof id !== 'number') res.status(400).send('Id must be a number.')

  const category = getById(id)

  res.send(category)
})

router.get('/', (req, res) => {
  const categories = getAll()

  res.send(categories)
})

router.post('/create', (req, res) => {
  const { name, description } = req.body

  if (!name) res.status(400).send('Name is required.')

  const category = create(name, description)

  res.send(category)
})

router.patch('/update/:id', (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  if (typeof id !== 'number') res.status(400).send('Id must be a number.')
  if (!name) res.status(400).send('Name is required.')

  const category = update(id, name, description)

  res.send(category)
})

router.delete('/remove/:id', (req, res) => {
  const { id } = req.params

  if (typeof id !== 'number') res.status(400).send('Id must be a number.')

  const category = remove(id)

  res.send(category)
})

export default router
