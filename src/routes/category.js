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
  '/create',
  body('name').exists().withMessage('Field "name" is required.'),
  categoryController.create
)

router.patch(
  '/update/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  categoryController.update
)

router.delete(
  '/remove/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  categoryController.remove
)

router.get(
  '/:id/subject',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  categoryController.getSubjectsByCategoryId
)

export default router
