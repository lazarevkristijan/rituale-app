import dotenv from "dotenv"
import postgres from "postgres"

dotenv.config()

const sql = postgres(process.env.DB_CONNECTION_STRING)

export default sql
