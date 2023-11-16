import express from "express"
import sql from "./db.js"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"

const app = express()
const port = process.env.PORT || 3001

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)

app.use(bodyParser.json())

app.get("/", (req, res) => res.type("text").send("DB ROOT"))

app.get("/users", async (req, res) => {
  try {
    const users = await sql`
    SELECT *
    FROM users
    `
    res.json(users)
  } catch (error) {
    console.error(error.message)
    console.error("Error fetching users: ", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  const saltRounds = 10

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}})`
  } catch (e) {
    console.error("Error during registration: ", e)
    res.status(500).send("Registration failed")
  }
})

app.post("/users", async (req, res) => {
  try {
    const { id, first_name, last_name } = req.body

    await sql`
    INSERT INTO users 
    VALUES (${id}, ${first_name},${last_name})`
  } catch (error) {
    console.error(error.message)
    console.error("Error adding user: ", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
