import { pool } from './_db-connection.js'
import { formatSetQueryParams } from '../utils/index.js'

const getById = async (id) => {
  const query = `
    SELECT * FROM category 
    WHERE id=${id};
  `
  const response = await pool.query(query)

  return response.rows[0]
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

  return response.rows[0]
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

  return response.rows[0]
}

const remove = async (id) => {
  const query = `
    DELETE FROM category 
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows[0]
}

const getSubjectsByCategoryId = async (id) => {
  const query = `
    SELECT * FROM subject
    WHERE category_id=${id};
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
  getSubjectsByCategoryId,
}
