import * as recordService from '../services/record.js'

import { validateReqParams } from '../utils/validation.js'

const getById = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const record = await recordService.getById(id, user_id)
    return res.send(record)
  } catch (err) {
    return next(err)
  }
}

const getAll = async (req, res, next) => {
  const { user_id } = res.locals

  try {
    const records = await recordService.getAll(user_id)

    return res.send(records)
  } catch (err) {
    return next(err)
  }
}

const create = async (req, res, next) => {
  const { name, description, category_id } = req.body
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const record = await recordService.create(name, description, category_id, user_id)
    return res.send(record)
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

    const record = await recordService.update(id, name, description, category_id, user_id)
    return res.send(record)
  } catch (err) {
    return next(err)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const record = await recordService.remove(id, user_id)
    return res.send(record)
  } catch (err) {
    return next(err)
  }
}

const getRefsByRecordId = async (req, res, next) => {
  const { id } = req.params
  const { user_id } = res.locals

  try {
    validateReqParams(req)

    const refs = await recordService.getRefsByRecordId(id, user_id)
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
  getRefsByRecordId,
}
