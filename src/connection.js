import pg from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

pool.connect()

export default pool
