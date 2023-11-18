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
    return res.status(400).send("Incorrect registration data")
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})`
  } catch (error) {
    console.error("Error during registration: ", error)
    res.status(500).send("Registration failed")
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  const storedPassword = await sql`
  SELECT password
  FROM users
  WHERE email = ${email}`

  console.log("Stored password: ", storedPassword[0].password)
  if (!storedPassword) {
    res.status(403).send("Invalid email or password")
    return
  }

  console.log("After check if not stored password and before bcrypt comparison")
  console.log("Inserted password", password)

  await bcrypt.compare(password, storedPassword, (err, result) => {
    if (err) {
      console.error("Error comparing passwords: ", err)
      return
    }

    if (result) {
      console.log("Passwords Match")
    } else {
      return console.error("Passwords do not match")
    }
  })

  const userInfo = await sql`
  SELECT id, first_name, last_name
  FROM users
  WHERE email = ${email}
  `

  console.log(userInfo)

  const user = {
    id: userInfo[0].id,
    first_name: userInfo[0].first_name,
    last_name: userInfo[0].last_name,
    email: email,
  }

  res.status(200).json(user)
})

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
