import * as categoryService from '../services/category.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params

  const error = validateReqParams(req)
  if (error) return next(error)

  const category = await categoryService.getById(id)
    .catch(err => next(err))

  if (!category) return next(new Error('404'))

  return res.send(category)
}

const getAll = async (req, res, next) => {
  const categories = await categoryService.getAll()
    .catch(err => next(err))

  res.send(categories)
}

const create = async (req, res, next) => {
  const { name, description } = req.body

  const error = validateReqParams(req)
  if (error) return next(error)

  const category = await categoryService.create(name, description)
    .catch(err => next(err))

  return res.send(category)
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, description } = req.body

  const error = validateReqParams(req)
  if (error) return next(error)

  const category = await categoryService.update(id, name, description)
    .catch(err => next(err))

  if (!category) return next(new Error('404'))

  return res.send(category)
}

const remove = async (req, res, next) => {
  const { id } = req.params

  const error = validateReqParams(req)
  if (error) return next(error)

  const category = await categoryService.remove(id)
    .catch(err => next(err))

  if (!category) return next(new Error('404'))

  return res.send(category)
}

export {
  getById,
  getAll,
  create,
  update,
  remove,
}
