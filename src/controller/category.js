import client from '../connection'

const getById = async (id) => {
  await client.connect()
  const query = `
    SELECT * FROM category 
    WHERE id=${id};
  `
  const response = await client.query(query)
  client.end()

  return response.rows
}

const getAll = async () => {
  await client.connect()
  const query = `
    SELECT * FROM category;
  `
  const response = await client.query(query)
  client.end()

  return response.rows
}

const create = async (name, description) => {
  await client.connect()
  const query = `
    INSERT INTO category(name, description) 
    VALUES(${name}, ${description});
  `
  const response = await client.query(query)
  client.end()

  return response.rows
}

const update = async (id, name, description) => {
  await client.connect()
  const query = `
    UPDATE category 
    SET ${name && `name=${name}`}, ${description && `description=${description}`} 
    WHERE id=${id};
  `
  const response = await client.query(query)
  client.end()

  return response.rows
}

const remove = async (id) => {
  await client.connect()
  const query = `
    DELETE FROM category WHERE id=${id};
  `
  const response = await client.query(query)
  client.end()

  return response.rows
}

export {
  getById,
  getAll,
  create,
  update,
  remove,
}
