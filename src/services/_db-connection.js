import pg from 'pg'
import { dbConfig } from '../configs/db.config.js'

const pool = new pg.Pool(dbConfig)

export { pool }
