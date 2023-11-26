import express from "express"
import sql from "./db.js"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import { emailRegex, nameRegex, passwordRegex } from "./Regex.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.DB_PORT || 3001

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(cookieParser())

const JWTsecret = process.env.JWT_SECRET

app.get("/", (req, res) => res.type("text").send("DB ROOT"))

const verifyToken = (req, res, next) => {
  const token = req.cookies.user

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" })
  }

  jwt.verify(token, JWTsecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" })
    }

    req.userId = decoded.userid
    next()
  })
}
app.get("/check-auth", verifyToken, (req, res) => {
  return res.status(200).json({ message: "User is authenticated" })
})

app.get("/users", async (req, res) => {
  try {
    const users = await sql`
    SELECT *
    FROM users`
    return res.json(users)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const sameEmail = await sql`
  SELECT email
  FROM users
  WHERE email = ${email}
  `

  if (sameEmail.length !== 0) {
    return res
      .status(409)
      .send("Email is already assosiated with a different account")
  }

  if (
    !nameRegex.test(firstName) ||
    !nameRegex.test(lastName) ||
    !emailRegex.test(email) ||
    !passwordRegex.test(password)
  ) {
    return res.status(400).send("Incorrect registration data")
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})
    RETURNING id`

    const token = jwt.sign({ userId }, JWTsecret)
    res.cookie("user", token, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 1,
    })
    return res.status(200).send("Registration successful")
  } catch (error) {
    console.log("Error during registration: ", error)
    return res.status(500).send("Registration failed")
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  const storedPassword = await sql`
  SELECT password
  FROM users
  WHERE email = ${email}`

  if (!Object.values(storedPassword).length) {
    return res.status(403).send("Email doesn't exist")
  }

  bcrypt.compare(password, storedPassword[0].password, async (err, result) => {
    if (err) {
      return res.status(500).send("Error comparing passwords: ", err)
    } else if (result) {
      const fetchedUser = await sql`
    SELECT id, first_name, last_name
    FROM users
    WHERE email = ${email}`

      const user = {
        id: fetchedUser[0].id,
        first_name: fetchedUser[0].first_name,
        last_name: fetchedUser[0].last_name,
        email: email,
      }

      const token = jwt.sign({ user: user.id }, JWTsecret)

      res.cookie("user", token, {
        httpOnly: true,
        domain: "localhost",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 1,
      })
      return res.status(200).json(user)
    } else {
      return res.status(403).send("Invalid password")
    }
  })
})

app.get("/logout", async (req, res) => {
  res.clearCookie("user")
  return res.status(200).send('Session cookie "user" deleted successfully ')
})

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
