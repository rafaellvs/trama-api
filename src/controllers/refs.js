import * as refsService from '../services/refs.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params

  const error = validateReqParams(req)
  if (error) return next(error)

  const ref = await refsService.getById(id)
    .catch(err => next(err))

  if (!ref) return next(new Error('404'))

  return res.send(ref)
}

const getAll = async (req, res, next) => {
  const refs = await refsService.getAll()
    .catch(err => next(err))

  return res.send(refs)
}

const create = async (req, res, next) => {
  const { content, subject_id } = req.body

  const error = validateReqParams(req)
  if (error) return next(error)

  const ref = await refsService.create(content, subject_id)
    .catch(err => next(err))

  return res.send(ref)
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { content, subject_id } = req.body

  const error = validateReqParams(req)
  if (error) return next(error)

  const ref = await refsService.update(id, content, subject_id)
    .catch(err => next(err))

  if (!ref) return next(new Error('404'))

  return res.send(ref)
}

const remove = async (req, res, next) => {
  const { id } = req.params

  const error = validateReqParams(req)
  if (error) return next(error)

  const ref = await refsService.remove(id)
    .catch(err => next(err))

  if (!ref) return next(new Error('404'))

  return res.send(ref)
}

export {
  getById,
  getAll,
  create,
  update,
  remove,
}
