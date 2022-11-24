import { Router } from 'express'
import validator from 'express-validator'

import { validateAndParseError } from '../helpers/errors.js'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/category.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateAndParseError(req)
    if (error) return next(error)

    const category = await getById(id)
      .catch(err => next(err))

    return res.send(category)
  })

router.get(
  '/',
  async (req, res, next) => {
    const categories = await getAll()
      .catch(err => next(err))

    res.send(categories)
  })

router.post(
  '/create',
  body('name', 'Field "name" is required.').exists(),
  async (req, res, next) => {
    const { name, description } = req.body

    const error = validateAndParseError(req)
    if (error) return next(error)

    const category = await create(name, description)
      .catch(err => next(err))

    return res.send(category)
  })

router.patch(
  '/update/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params
    const { name, description } = req.body

    const error = validateAndParseError(req)
    if (error) return next(error)

    const category = await update(id, name, description)
      .catch(err => next(err))

    return res.send(category)
  })

router.delete(
  '/remove/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateAndParseError(req)
    if (error) return next(error)

    const category = await remove(id)
      .catch(err => next(err))

    return res.send(category)
  })

export default router
