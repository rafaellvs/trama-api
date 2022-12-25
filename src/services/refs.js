import { pool } from './_db-connection.js'
import { formatSetQueryParams } from '../utils/index.js'

const getById = async (id) => {
  const query = `
    SELECT * FROM refs
    WHERE id=${id};
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const getAll = async () => {
  const query = `
    SELECT * FROM refs;
  `

  const response = await pool.query(query)

  return response.rows
}

const create = async (content, subject_id) => {
  const query = `
    INSERT INTO refs(content, subject_id)
    VALUES('${content}', '${subject_id}')
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const update = async (id, content, subject_id) => {
  const query = `
    UPDATE refs
    SET ${formatSetQueryParams([
      { name: 'content', content },
      { name: 'subject_id', content: subject_id },
    ])}
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const remove = async (id) => {
  const query = `
    DELETE FROM refs
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

export {
  getById,
  getAll,
  create,
  update,
  remove,
}
