import { Router } from 'express'
import validator from 'express-validator'

import {
  getById,
  getAll,
  create,
  update,
  remove,
} from '../controller/subject.js'
import { validateReqParams } from '../utils/validation.js'

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

    const subject = await getById(id)
      .catch(err => next(err))

    if (!subject) return next(new Error('404'))

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
  body('name')
    .exists().withMessage('Field "name" is required.'),
  body('category_id')
    .exists().withMessage('Field "category_id" is required.')
    .isNumeric().withMessage('Field "category_id" must be an integer.'),
  async (req, res, next) => {
    const { name, description, category_id } = req.body

    const error = validateReqParams(req)
    if (error) return next(error)

    const subject = await create(name, description, category_id)
      .catch(err => next(err))

    if (!subject) return next(new Error('404'))

    return res.send(subject)
  })

router.patch(
  '/update/:id',
  param('id')
    .isNumeric().withMessage('Field "id" must be an integer.'),
  async (req, res, next) => {
    const { id } = req.params
    const { name, description, category_id } = req.body

    const error = validateReqParams(req)
    if (error) return next(error)

    const subject = await update(id, name, description, category_id)
      .catch(err => next(err))

    if (!subject) return next(new Error('404'))

    return res.send(subject)
  })

router.delete(
  '/remove/:id',
  param('id')
    .isNumeric().withMessage('Param "id" must be an integer.'),
  async (req, res, next) => {
    const { id } = req.params

    const error = validateReqParams(req)
    if (error) return next(error)

    const subject = await remove(id)
      .catch(err => next(err))

    if (!subject) return next(new Error('404'))

    return res.send(subject)
  })

export default router
