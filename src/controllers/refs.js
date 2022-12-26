import * as refsService from '../services/refs.js'
import * as subjectService from '../services/subject.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params

  try {
    validateReqParams(req)

    const ref = await refsService.getById(id)
    if (!ref) throw new Error('Ref not found', { cause: '404' })

    return res.send(ref)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  try {
    const refs = await refsService.getAll()

    return res.send(refs)
  } catch (err) {
    return next(err)
  }
}

const create = async (req, res, next) => {
  const { content, subject_id } = req.body

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(subject_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    const ref = await refsService.create(content, subject_id)

    return res.send(ref)
  } catch (err) {
    return next(err)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { content, subject_id } = req.body

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(subject_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    const ref = await refsService.update(id, content, subject_id)
    if (!ref) throw new Error('Ref not found', { cause: '404' })

    return res.send(ref)
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    validateReqParams(req)

    const ref = await refsService.remove(id)
    if (!ref) throw new Error('Ref not found', { cause: '404' })

    return res.send(ref)
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
}
