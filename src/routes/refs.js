import { Router } from 'express'
import validator from 'express-validator'

import { validateAndParseError } from '../helpers/errors.js'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/refs.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateAndParseError(req)
    if (error) return next(error)

    const ref = await getById(id)
      .catch(err => next(err))

    return res.send(ref)
  })

router.get(
  '/',
  async (req, res, next) => {
    const refs = await getAll()
      .catch(err => next(err))

    return res.send(refs)
  })

router.post(
  '/create',
  body('content', 'Field "content" is required.').exists(),
  body('subjectId', 'Field "subjectId" is required.').exists(),
  async (req, res, next) => {
    const { content, subjectId } = req.body

    const error = validateAndParseError(req)
    if (error) return next(error)

    const ref = await create(content, subjectId)
      .catch(err => next(err))

    return res.send(ref)
  })

router.patch(
  '/update/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params
    const { content, subjectId } = req.body

    const error = validateAndParseError(req)
    if (error) return next(error)

    const ref = await update(id, content, subjectId)
      .catch(err => next(err))

    return res.send(ref)
  })

router.delete(
  '/remove/:id',
  param('id', 'Param "id" must be an integer.').isNumeric(),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateAndParseError(req)
    if (error) return next(error)

    const ref = await remove(id)
      .catch(err => next(err))

    return res.send(ref)
  })

export default router
