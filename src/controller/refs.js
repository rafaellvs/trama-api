import pool from '../connection.js'
import { formatSetQueryParams } from '../helpers/utils.js'

const getById = async (id) => {
  const query = `
    SELECT * FROM refs
    WHERE id=${id};
  `
  const response = await pool.query(query)

  return response.rows
}

const getAll = async () => {
  const query = `
    SELECT * FROM refs;
  `

  const response = await pool.query(query)

  return response.rows
}

const create = async (content, subjectId) => {
  const query = `
    INSERT INTO refs(content, subject_id)
    VALUES('${content}', '${subjectId}')
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows
}

const update = async (id, content, subjectId) => {
  const query = `
    UPDATE refs
    SET ${formatSetQueryParams([
      { name: 'content', content },
      { name: 'subject_id', content: subjectId },
    ])}
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows
}

const remove = async (id) => {
  const query = `
    DELETE FROM refs
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows
}

export {
  getById,
  getAll,
  create,
  update,
  remove,
}
