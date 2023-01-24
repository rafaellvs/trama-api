import * as refsService from '../services/refs.js'
import * as subjectService from '../services/subject.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const ref = await refsService.getById(id, user_id)
    if (!ref) throw new Error('Ref not found', { cause: '404' })

    return res.send(ref)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  const { user_id } = res.locals

  try {
    const refs = await refsService.getAll(user_id)

    return res.send(refs)
  } catch (err) {
    return next(err)
  }
}

const create = async (req, res, next) => {
  const { content, record_id } = req.body
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(record_id, user_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    const ref = await refsService.create(content, record_id, user_id)

    return res.send(ref)
  } catch (err) {
    return next(err)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { content, record_id } = req.body
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const subject = await subjectService.getById(record_id, user_id)
    if (!subject) throw new Error('Subject not found', { cause: '404' })

    const ref = await refsService.update(id, content, record_id, user_id)
    if (!ref) throw new Error('Ref not found', { cause: '404' })

    return res.send(ref)
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const ref = await refsService.remove(id, user_id)
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
