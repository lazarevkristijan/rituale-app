import express from "express"
import sql from "./db.js"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import { emailRegex, nameRegex, passwordRegex } from "./Regex.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { verifyToken, JWTsecret } from "./middleware/verifyToken.js"
import {
  getCheckAuth,
  getLogout,
  getRoot,
  getUsers,
} from "./Routes/getRoutes.js"
import { postLogin, postRegister } from "./Routes/postRoutes.js"

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

app.get("/", getRoot)

app.get("/check-auth", verifyToken, getCheckAuth)

app.get("/users", getUsers)

app.post("/register", postRegister)

app.post("/login", postLogin)

app.get("/logout", getLogout)

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
