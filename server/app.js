import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { verifyToken } from "./middleware/verifyToken.js"
import {
  getCheckAuth,
  getCompletedHabits,
  getHabitCategories,
  getHabits,
  getLogout,
  getResetHabitProgress,
  getRoot,
  getUserSettings,
  getUsers,
} from "./Routes/getRoutes.js"
import {
  postCompleteHabit,
  postLogin,
  postRegister,
  postRemoveHabit,
} from "./Routes/postRoutes.js"
import {
  patchAddPriorityCategory,
  patchChangeLanguage,
  patchChangeTheme,
  patchChangeUserData,
  patchRemovePriorityCategory,
} from "./Routes/patchRoutes.js"
import { deleteUser } from "./Routes/deleteRoutes.js"

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
app.get("/habits", getHabits)
app.get("/habit-categories", getHabitCategories)

app.post("/login", postLogin)
app.post("/register", postRegister)
app.get("/logout", getLogout)
app.delete("/delete-user", verifyToken, deleteUser)

app.get("/completed-habits", verifyToken, getCompletedHabits)
app.post("/complete-habit", verifyToken, postCompleteHabit)
app.post("/remove-habit", verifyToken, postRemoveHabit)
app.get("/reset-habit-progress", verifyToken, getResetHabitProgress)

app.get("/user-settings", verifyToken, getUserSettings)
app.patch("/user-settings/change-theme", verifyToken, patchChangeTheme)
app.patch("/user-settings/change-language", verifyToken, patchChangeLanguage)
app.patch("/change-user-data", verifyToken, patchChangeUserData)
app.patch("/add-priority-category", verifyToken, patchAddPriorityCategory)
app.patch("/remove-priority-category", verifyToken, patchRemovePriorityCategory)

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
