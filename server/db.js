import dotenv from "dotenv"
import postgres from "postgres"

dotenv.config()

const sql = postgres({
  host: process.env.DATABASE,
  port: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  ssl: true,
})

export default sql
