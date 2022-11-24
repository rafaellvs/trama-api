import pool from '../helpers/db-connection.js'
import { formatSetQueryParams } from '../helpers/utils.js'

const getById = async (id) => {
  const query = `
    SELECT * FROM category 
    WHERE id=${id};
  `
  const response = await pool.query(query)

  return response.rows
}

const getAll = async () => {
  const query = `
    SELECT * FROM category;
  `
  const response = await pool.query(query)

  return response.rows
}

const create = async (name, description) => {
  const query = `
    INSERT INTO category(name, description) 
    VALUES('${name}', '${description}')
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows
}

const update = async (id, name, description) => {
  const query = `
    UPDATE category 
    SET ${formatSetQueryParams([
      { name: 'name', content: name },
      { name: 'description', content: description },
    ])}
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows
}

const remove = async (id) => {
  const query = `
    DELETE FROM category 
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
