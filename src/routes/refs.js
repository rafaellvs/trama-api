import { Router } from 'express'
import validator from 'express-validator'

import * as refsController from '../controllers/refs.js'

const router = Router()
const { param, body } = validator

router.get(
  '/:id',
  param('id')
    .isNumeric().withMessage('Param "id" must be an integer.'),
  refsController.getById
)

router.get(
  '/',
  refsController.getAll
)

router.post(
  '/create',
  body('content')
    .exists().withMessage('Field "content" is required.')
    .notEmpty().withMessage('Field "content" cannot be empty.'),
  body('record_id')
    .exists().withMessage('Field "record_id" is required.')
    .isNumeric().withMessage('Field "record_id" must be an integer.'),
  refsController.create
)

router.patch(
  '/update/:id',
  param('id')
    .isNumeric().withMessage('Param "id" must be an integer.'),
  body('record_id')
    .isNumeric().withMessage('Param "record_id" must be an integer.'),
  refsController.update
)

router.delete(
  '/remove/:id',
  param('id')
    .isNumeric().withMessage('Param "id" must be an integer.'),
  refsController.remove
)

export default router
