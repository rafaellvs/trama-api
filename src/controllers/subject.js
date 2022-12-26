import * as subjectService from '../services/subject.js'
import * as categoryService from '../services/category.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(id)
    if (!subject) throw new Error('404')

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  try {
    const subjects = await subjectService.getAll()

    return res.send(subjects)
  } catch (err) {
    return next(err)
  }
}

const create = async (req, res, next) => {
  const { name, description, category_id } = req.body

  try {
    validateReqParams(req)

    const category = await categoryService.getById(category_id)
    if (!category) throw new Error('404')

    const subject = await subjectService.create(name, description, category_id)
    if (!subject) throw new Error('404')

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, description, category_id } = req.body

  try {
    validateReqParams(req)

    const category = await categoryService.getById(category_id)
    if (!category) throw new Error('404')

    const subject = await subjectService.update(id, name, description, category_id)
    if (!subject) throw new Error('404')

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    validateReqParams(req)

    const subject = await subjectService.remove(id)
    if (!subject) throw new Error('404')

    return res.send(subject)
  } catch (err) {
    return next(err)
  }
}

const getRefsBySubjectId = async (req, res, next) => {
  const { id } = req.params

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(id)
    if (!subject) throw new Error('404')

    const refs = await subjectService.getRefsBySubjectId(id)

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
