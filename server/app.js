import express from "express"
import sql from "./db.js"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import { emailRegex, nameRegex, passwordRegex } from "./Regex.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

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
app.use(cookieParser())

const JWTsecret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const token = req.cookies.token

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
  res.status(200).json({ message: "User is authenticated", userid: req.userId })
})

app.get("/", (req, res) => res.type("text").send("DB ROOT"))

app.get("/users", async (req, res) => {
  try {
    const users = await sql`
    SELECT *
    FROM users`
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
    const userId = await sql`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})
    RETURNING id`

    const token = jwt.sign({ userId }, JWTsecret, { expiresIn: "1h" })
    res.cookie("token", token, { httpOnly: true })
  } catch (error) {
    console.error("Error during registration: ", error)
    res.status(500).send("Registration failed")
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  console.log("ENtered creds: ", email, password)

  const storedPassword = await sql`
  SELECT password
  FROM users
  WHERE email = ${email}`

  console.log("Stored password is :", storedPassword)

  if (!Object.values(storedPassword).length) {
    return res.status(403).send("Email doesn't exist")
  }

  bcrypt.compare(password, storedPassword[0].password, async (err, result) => {
    if (err) {
      return res.status(500).send("Error comparing passwords: ", err)
    } else if (result) {
      console.log("BCRYPT compare result: ", result)
      const userInfo = await sql`
    SELECT id, first_name, last_name
    FROM users
    WHERE email = ${email}`

      const user = {
        id: userInfo[0].id,
        first_name: userInfo[0].first_name,
        last_name: userInfo[0].last_name,
        email: email,
      }

      const token = jwt.sign(user.id, JWTsecret, { expiresIn: "1h" })

      console.log("Generated token: ", token)
      res.cookie("token", token, {
        httpOnly: true,
        domain: "http://localhost",
        path: "/",
      })
      res.status(200).json(user)
    } else {
      return res.status(403).send("Invalid password")
    }
  })
})

// const invalidCredRes = (res) => {
//   return res.status(403).send("Invalid email or password")
// }

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
