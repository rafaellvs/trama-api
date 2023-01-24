import { pool } from './_db-connection.js'
import { formatSetQueryParams } from '../utils/index.js'

const getById = async (id, user_id) => {
  const query = `
    SELECT * FROM record 
    WHERE id=${id} AND user_id='${user_id}';
  `
  const response = await pool.query(query)
  return response.rows[0]
}

const getAll = async (user_id) => {
  const query = `
    SELECT * FROM record
    WHERE user_id='${user_id}';
  `
  const response = await pool.query(query)
  return response.rows
}

const create = async (name, description, category_id, user_id) => {
  const query = `
    INSERT INTO record(name, description, category_id, user_id) 
    VALUES('${name}', '${description}', ${category_id}, '${user_id}')
    RETURNING *;
  `
  const response = await pool.query(query)
  return response.rows[0]
}

const update = async (id, name, description, category_id, user_id) => {
  const query = `
    UPDATE record 
    SET ${formatSetQueryParams([
      { name: 'name', content: name },
      { name: 'description', content: description },
      { name: 'category_id', content: category_id },
    ])}
    WHERE id=${id} AND user_id='${user_id}'
    RETURNING *;
  `
  const response = await pool.query(query)
  return response.rows[0]
}

const remove = async (id, user_id) => {
  const query = `
    DELETE FROM record 
    WHERE id=${id} AND user_id='${user_id}'
    RETURNING *;
  `
  const response = await pool.query(query)
  return response.rows[0]
}

const getRefsBySubjectId = async (id, user_id) => {
  const query = `
    SELECT * FROM ref
    WHERE record_id=${id} AND user_id='${user_id}';
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
  getRefsBySubjectId,
}
