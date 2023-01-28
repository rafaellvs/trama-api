import { pool } from './_db-connection.js'
import { formatSetQueryParams } from '../utils/index.js'

const getById = async (id, user_id) => {
  const query = `
    SELECT * FROM ref
    WHERE id=${id} AND user_id='${user_id}';
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const getAll = async (user_id) => {
  const query = `
    SELECT * FROM ref
    WHERE user_id='${user_id}'
    ORDER BY created_at DESC;
  `
  const response = await pool.query(query)

  return response.rows
}

const create = async (content, record_id, user_id) => {
  const query = `
    INSERT INTO ref(content, record_id, user_id)
    VALUES('${content}', '${record_id}', '${user_id}')
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const update = async (id, content, record_id, user_id) => {
  const query = `
    UPDATE ref
    SET ${formatSetQueryParams([
      { name: 'content', content },
      { name: 'record_id', content: record_id },
    ])}
    WHERE id=${id} AND user_id='${user_id}'
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const remove = async (id, user_id) => {
  const query = `
    DELETE FROM ref
    WHERE id=${id} AND user_id='${user_id}'
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
