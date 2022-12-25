import { Router } from 'express'
import validator from 'express-validator'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/subject.js'
import { validateAndParseError } from '../helpers/errors.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateAndParseError(req)
    if (error) return next(error)

    const subject = await getById(id)
      .catch(err => next(err))

    return res.send(subject)
  })

router.get(
  '/',
  async (req, res, next) => {
    const subjects = await getAll()
      .catch(err => next(err))

    return res.send(subjects)
  })

router.post(
  '/create',
  body('name', 'Field "name" is required.').exists(),
  body('category_id', 'Field "category_id" is required.').exists(),
  async (req, res, next) => {
    const { name, description, category_id } = req.body

    const error = validateAndParseError(req)
    if (error) return next(error)

    const subject = await create(name, description, category_id)
      .catch(err => next(err))

    return res.send(subject)
  })

router.patch(
  '/update/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params
    const { name, description, category_id } = req.body

    const error = validateAndParseError(req)
    if (error) return next(error)

    const response = await update(id, name, description, category_id)
      .catch(err => next(err))

    return res.send(response)
  })

router.delete(
  '/remove/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateAndParseError(req)
    if (error) return next(error)

    const response = await remove(id)
      .catch(err => next(err))

    return res.send(response)
  })

export default router
