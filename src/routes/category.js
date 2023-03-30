import { Router } from 'express'
import validator from 'express-validator'

import * as categoryController from '../controllers/category.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  categoryController.getById
)

router.get(
  '/',
  categoryController.getAll
)

router.post(
  '/',
  body('name')
    .exists().withMessage('Field "name" is required.')
    .notEmpty().withMessage('Field "name" cannot be empty.'),
  categoryController.create
)

router.patch(
  '/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  categoryController.update
)

router.delete(
  '/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  categoryController.remove
)

router.get(
  '/:id/record',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  categoryController.getRecordsByCategoryId
)

export default router
