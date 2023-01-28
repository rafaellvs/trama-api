import { pool } from './_db-connection.js'
import { formatSetQueryParams } from '../utils/index.js'

const getById = async (id, user_id) => {
  const query = `
    SELECT * FROM category 
    WHERE id=${id} AND user_id='${user_id}';
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const getAll = async (user_id) => {
  const query = `
    SELECT * FROM category
    WHERE user_id='${user_id}'
    ORDER BY created_at DESC;
  `
  const response = await pool.query(query)

  return response.rows
}

const create = async (name, description, user_id) => {
  const query = `
    INSERT INTO category(name, description, user_id) 
    VALUES('${name}', '${description}', '${user_id}')
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const update = async (id, name, description, user_id) => {
  const query = `
    UPDATE category 
    SET ${formatSetQueryParams([
      { name: 'name', content: name },
      { name: 'description', content: description },
    ])}
    WHERE id=${id} AND user_id='${user_id}'
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const remove = async (id, user_id) => {
  const query = `
    DELETE FROM category 
    WHERE id=${id} AND user_id='${user_id}'
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const getRecordsByCategoryId = async (id, user_id) => {
  const query = `
    SELECT * FROM record
    WHERE category_id=${id} AND user_id='${user_id}'
    ORDER BY created_at DESC;
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
  getRecordsByCategoryId,
}
