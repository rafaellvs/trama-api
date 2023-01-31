import { Router } from 'express'
import validator from 'express-validator'

import * as recordController from '../controllers/record.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  recordController.getById
)

router.get(
  '/',
  recordController.getAll
)

router.post(
  '/create',
  body('name')
    .exists().withMessage('Field "name" is required.')
    .notEmpty().withMessage('Field "name" cannot be empty.'),
  body('category_id')
    .exists().withMessage('Field "category_id" is required.')
    .isNumeric().withMessage('Field "category_id" must be an integer.'),
  recordController.create
)

router.patch(
  '/update/:id',
  param('id')
    .isNumeric().withMessage('Field "id" must be an integer.'),
  body('category_id')
    .isNumeric().withMessage('Field "category_id" must be an integer.'),
  recordController.update
)

router.delete(
  '/remove/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  recordController.remove
)

router.get(
  '/:id/refs',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  recordController.getRefsByRecordId
)

export default router
