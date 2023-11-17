import express from "express"
import sql from "./db.js"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import { emailRegex, nameRegex, passwordRegex } from "./Regex.js"

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
  const { firstName, lastName, email, password } = req.body

  if (
    !nameRegex.test(firstName) ||
    !nameRegex.test(lastName) ||
    !emailRegex.test(email) ||
    !passwordRegex.test(password)
  ) {
    console.log("Something wrong with credentials")
    return res.status(422).send("Incorrect registration data")
  }

  const saltRounds = 10

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})`
  } catch (e) {
    console.error("Error during registration: ", e)
    res.status(500).send("Registration failed")
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  const hashedPassword = await sql`
  SELECT password
  FROM users
  WHERE email = ${email}`

  if (!hashedPassword) {
    res.status(401)
    return console.log("Invalid email or password")
  }

  const match = await bcrypt.compare(password, hashedPassword)

  if (match) {
    console.log("object")
    return console.log("Invalid email or password")
  } else {
    return console.log("Invalid email or password")
  }
})

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
