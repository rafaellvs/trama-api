import * as subjectService from '../services/subject.js'
import * as categoryService from '../services/category.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(id, user_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  const { user_id } = res.locals

  try {
    const subjects = await subjectService.getAll(user_id)

    return res.send(subjects)
  } catch (err) {
    return next(err)
  }
}

const create = async (req, res, next) => {
  const { name, description, category_id } = req.body
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const category = await categoryService.getById(category_id, user_id)
    if (!category) throw new Error('Category not found', { cause: '404' })

    const subject = await subjectService.create(name, description, category_id, user_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, description, category_id } = req.body
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const category = await categoryService.getById(category_id, user_id)
    if (!category) throw new Error('Category not found', { cause: '404' })

    const subject = await subjectService.update(id, name, description, category_id, user_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const subject = await subjectService.remove(id, user_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const getRefsBySubjectId = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(id, user_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    const refs = await subjectService.getRefsBySubjectId(id, user_id)

    return res.send(refs)
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
  getRefsBySubjectId,
}
