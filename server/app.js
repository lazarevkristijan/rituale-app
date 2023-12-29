import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { verifyToken } from "./middleware/verifyToken.js"
import {
  getAllBlogs,
  getAllCompletedHabits,
  getCheckAuth,
  getCompletedHabits,
  getAllCountries,
  getAllFinishedProfiles,
  getAllHabitCategories,
  getAllHabits,
  getLogout,
  getPreviewCompletedHabits,
  getResetHabitProgress,
  getRoot,
  getUser,
  getUserSettings,
  getAllUsers,
} from "./Routes/getRoutes.js"
import {
  postAddBlog,
  postCompleteHabit,
  postLoginOrRegister,
  postRemoveHabit,
} from "./Routes/postRoutes.js"
import {
  patchAddPriorityCategory,
  patchChangeLanguage,
  patchChangeTheme,
  patchRemovePriorityCategory,
  patchChangeCountry,
  patchChangeBio,
  patchChangeCreds,
  patchChangeProfilePicture,
  patchPinHabit,
} from "./Routes/patchRoutes.js"
import {
  deleteBlog,
  deleteProfilePicture,
  deleteUser,
} from "./Routes/deleteRoutes.js"
import multer from "multer"
import { storage } from "./cloudinary/index.js"
const upload = multer({ storage })

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

// GENERAL
app.get("/", getRoot)
app.get("/check-auth", verifyToken, getCheckAuth)

// GET DATA
app.get("/all-users", getAllUsers)
app.get("/all-finished-profiles", getAllFinishedProfiles)
app.get("/user/:id", getUser)
app.get("/all-habits", getAllHabits)
app.get("/all-habit-categories", getAllHabitCategories)
app.get("/all-countries", getAllCountries)
app.get("/all-blogs", getAllBlogs)

// AUTHENTICATION RELATED
app.get("/logout", getLogout)
app.delete("/delete-user", deleteUser)
app.post("/login-or-register", postLoginOrRegister)

// HABIT RELATED
app.get("/completed-habits/:id", getCompletedHabits)
app.get("/all-completed-habits", getAllCompletedHabits)
app.get("/preview-completed-habits/:id", getPreviewCompletedHabits)

app.post("/complete-habit", postCompleteHabit)
app.post("/remove-habit", postRemoveHabit)
app.get("/reset-habit-progress", getResetHabitProgress)
app.patch("/pin-habit", patchPinHabit)

app.patch("/add-priority-category", patchAddPriorityCategory)
app.patch("/remove-priority-category", patchRemovePriorityCategory)

app.post("/add-blog", postAddBlog)
app.delete("/remove-blog", deleteBlog)

// USER SETTINGS
app.get("/user-settings/:id", getUserSettings)
app.patch("/user-settings/change-theme", patchChangeTheme)
app.patch("/user-settings/change-language", patchChangeLanguage)
app.patch("/user-settings/change-country", patchChangeCountry)
app.patch("/user-settings/change-bio", patchChangeBio)
app.patch("/user-settings/change-creds", patchChangeCreds)
app.patch(
  "/user-settings/change-profile-picture",
  upload.single("profilePicture"),
  patchChangeProfilePicture
)
app.delete("/user-settings/delete-profile-picture", deleteProfilePicture)

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
