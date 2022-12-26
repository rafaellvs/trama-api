import * as categoryService from '../services/category.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params

  try {
    validateReqParams(req)

    const category = await categoryService.getById(id)
    if (!category) throw new Error('404')

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll()

    return res.send(categories)
  } catch (err) {
    return next(err)
  }
}

const create = async (req, res, next) => {
  const { name, description } = req.body

  try {
    validateReqParams(req)

    const category = await categoryService.create(name, description)

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, description } = req.body

  try {
    validateReqParams(req)

    const category = await categoryService.update(id, name, description)
    if (!category) throw new Error('404')

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    validateReqParams(req)

    const category = await categoryService.remove(id)
    if (!category) throw new Error('404')

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const getSubjectsByCategoryId = async (req, res, next) => {
  const { id } = req.params

  try {
    const category = await categoryService.getById(id)
    if (!category) throw new Error('404')

    const subjects = await categoryService.getSubjectsByCategoryId(id)

    return res.send(subjects)
  } catch (err) {
    return next(err)
  }
}

export {
  getById,
  getAll,
  create,
  update,
  remove,
  getSubjectsByCategoryId,
}
