import * as subjectService from '../services/subject.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params

  const error = validateReqParams(req)
  if (error) return next(error)

  const subject = await subjectService.getById(id)
    .catch(err => next(err))

  if (!subject) return next(new Error('404'))

  return res.send(subject)
}

const getAll = async (req, res, next) => {
  const subjects = await subjectService.getAll()
    .catch(err => next(err))

  return res.send(subjects)
}

const create = async (req, res, next) => {
  const { name, description, category_id } = req.body

  const error = validateReqParams(req)
  if (error) return next(error)

  const subject = await subjectService.create(name, description, category_id)
    .catch(err => next(err))

  if (!subject) return next(new Error('404'))

  return res.send(subject)
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, description, category_id } = req.body

  const error = validateReqParams(req)
  if (error) return next(error)

  const subject = await subjectService.update(id, name, description, category_id)
    .catch(err => next(err))

  if (!subject) return next(new Error('404'))

  return res.send(subject)
}

const remove = async (req, res, next) => {
  const { id } = req.params

  const error = validateReqParams(req)
  if (error) return next(error)

  const subject = await subjectService.remove(id)
    .catch(err => next(err))

  if (!subject) return next(new Error('404'))

  return res.send(subject)
}

export {
  getById,
  getAll,
  create,
  update,
  remove,
}
