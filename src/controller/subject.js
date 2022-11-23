import pool from '../connection.js'
import { formatSetQueryParams } from '../helpers/utils.js'

const getById = async (id) => {
  const querySubject = `
    SELECT * FROM subject 
    WHERE id=${id};
  `
  const queryRefs = `
    SELECT * FROM refs
    WHERE subject_id=${id};
  `
  const responseSubject = await pool.query(querySubject)
  const responseRefs = await pool.query(queryRefs)

  const response = {
    ...responseSubject.rows[0],
    refs: responseRefs.rows,
  }

  return response
}

const getAll = async () => {
  const querySubject = `
    SELECT * FROM subject;
  `
  const queryRefs = `
    SELECT * FROM refs;
  `
  const responseSubject = await pool.query(querySubject)
  const responseRefs = await pool.query(queryRefs)

  const response = responseSubject.rows.map(subject => {
    const refs = responseRefs.rows.filter(ref => ref.subject_id === subject.id)

    return {
      ...subject,
      refs,
    }
  })

  return response
}

const create = async (name, description, categoryId) => {
  const query = `
    INSERT INTO subject(name, description, category_id) 
    VALUES('${name}', '${description}', ${categoryId})
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows
}

const update = async (id, name, description, categoryId) => {
  const query = `
    UPDATE subject 
    SET ${formatSetQueryParams([
      { name: 'name', content: name },
      { name: 'description', content: description },
      { name: 'category_id', content: categoryId },
    ])}
    WHERE id=${id}
    RETURNING *;
  `
  const response = await pool.query(query)

  return response.rows
}

const remove = async (id) => {
  const query = `
    DELETE FROM subject 
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
