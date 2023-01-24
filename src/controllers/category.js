import * as categoryService from '../services/category.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const category = await categoryService.getById(id, user_id)
    if (!category) throw new Error('Category not found', { cause: '404' })

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  const { user_id } = res.locals

  try {
    const categories = await categoryService.getAll(user_id)

    return res.send(categories)
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

const create = async (req, res, next) => {
  const { name, description } = req.body
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const category = await categoryService.create(name, description, user_id)

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, description } = req.body
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const category = await categoryService.update(id, name, description, user_id)
    if (!category) throw new Error('Category not found', { cause: '404' })

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const category = await categoryService.remove(id, user_id)
    if (!category) throw new Error('Category not found', { cause: '404' })

    return res.send(category)
  } catch (err) {
    return next(err)
  }
}

const getRecordsByCategoryId = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    const category = await categoryService.getById(id, user_id)
    if (!category) throw new Error('Category not found', { cause: '404' })

    const records = await categoryService.getRecordsByCategoryId(id, user_id)

    return res.send(records)
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
  getRecordsByCategoryId,
}
