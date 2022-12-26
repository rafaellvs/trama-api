import { pool } from './_db-connection.js'
import { formatSetQueryParams } from '../utils/index.js'

const getById = async (id) => {
  const query = `
    SELECT * FROM subject 
    WHERE id=${id};
  `
  const response = await pool.query(query)
  return response.rows[0]
}

const getAll = async () => {
  const query = `
    SELECT * FROM subject;
  `
  const response = await pool.query(query)
  return response.rows
}

const create = async (name, description, category_id) => {
  const query = `
    INSERT INTO subject(name, description, category_id) 
    VALUES('${name}', '${description}', ${category_id})
    RETURNING *;
  `
  const response = await pool.query(query)
  return response.rows[0]
}

const update = async (id, name, description, category_id) => {
  const query = `
    UPDATE subject 
    SET ${formatSetQueryParams([
      { name: 'name', content: name },
      { name: 'description', content: description },
      { name: 'category_id', content: category_id },
    ])}
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)
  return response.rows[0]
}

const remove = async (id) => {
  const query = `
    DELETE FROM subject 
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
