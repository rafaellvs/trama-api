import { Router } from 'express'
import validator from 'express-validator'

import { validateReqParams } from '../utils/validation.js'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../services/refs.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id')
    .isNumeric().withMessage('Param "id" must be an integer.'),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateReqParams(req)
    if (error) return next(error)

    const ref = await getById(id)
      .catch(err => next(err))

    if (!ref) return next(new Error('404'))

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
  body('content')
    .exists().withMessage('Field "content" is required.'),
  body('subject_id')
    .exists().withMessage('Field "subject_id" is required.')
    .isNumeric().withMessage('Field "subject_id" must be an integer.'),
  async (req, res, next) => {
    const { content, subject_id } = req.body

    const error = validateReqParams(req)
    if (error) return next(error)

    const ref = await create(content, subject_id)
      .catch(err => next(err))

    return res.send(ref)
  })

router.patch(
  '/update/:id',
  param('id')
    .isNumeric().withMessage('Param "id" must be an integer.'),
  async (req, res, next) => {
    const { id } = req.params
    const { content, subject_id } = req.body

    const error = validateReqParams(req)
    if (error) return next(error)

    const ref = await update(id, content, subject_id)
      .catch(err => next(err))

    if (!ref) return next(new Error('404'))

    return res.send(ref)
  })

router.delete(
  '/remove/:id',
  param('id')
    .isNumeric().withMessage('Param "id" must be an integer.'),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateReqParams(req)
    if (error) return next(error)

    const ref = await remove(id)
      .catch(err => next(err))

    if (!ref) return next(new Error('404'))

    return res.send(ref)
  })

export default router
