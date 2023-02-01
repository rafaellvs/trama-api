import * as refService from '../services/ref.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const ref = await refService.getById(id, user_id)
    return res.send(ref)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  const { user_id } = res.locals

  try {
    const refs = await refService.getAll(user_id)
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

    const ref = await refService.create(content, record_id, user_id)
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

    const ref = await refService.update(id, content, record_id, user_id)
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

    const ref = await refService.remove(id, user_id)
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
