import { Router } from 'express'
import validator from 'express-validator'

import * as subjectController from '../controllers/record.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  subjectController.getById
)

router.get(
  '/',
  subjectController.getAll
)

router.post(
  '/create',
  body('name')
    .exists().withMessage('Field "name" is required.')
    .notEmpty().withMessage('Field "name" cannot be empty.'),
  body('category_id')
    .exists().withMessage('Field "category_id" is required.')
    .isNumeric().withMessage('Field "category_id" must be an integer.'),
  subjectController.create
)

router.patch(
  '/update/:id',
  param('id')
    .isNumeric().withMessage('Field "id" must be an integer.'),
  body('category_id')
    .isNumeric().withMessage('Field "category_id" must be an integer.'),
  subjectController.update
)

router.delete(
  '/remove/:id',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  subjectController.remove
)

router.get(
  '/:id/refs',
  param('id').isNumeric().withMessage('Param "id" must be an integer.'),
  subjectController.getRefsByRecordId
)

export default router
