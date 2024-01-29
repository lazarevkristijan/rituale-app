import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { verifyToken } from "./middleware/verifyToken.js"
import { checkAccess } from "./middleware/checkAccess.js"
import {
  getAllBlogs,
  getAllCompletedHabits,
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
  getCookieConsent,
  getAcceptConsentCookies,
  getCheckUsernameAvailability,
} from "./Routes/getRoutes.js"
import {
  postAddBlog,
  postCompleteHabit,
  postLoginOrRegister,
} from "./Routes/postRoutes.js"
import {
  patchAddPriorityCategory,
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
  deleteRemoveHabit,
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
    origin: "https://www.rituale.digital",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(checkAccess)

// GENERAL
app.get("/", getRoot)
app.get("/check-cookie-consent", getCookieConsent)
app.get("/accept-consent-cookies", getAcceptConsentCookies)

// GET DATA
app.get("/all-users", getAllUsers)
app.get("/all-finished-profiles", getAllFinishedProfiles)
app.get("/user/:username", getUser)
app.get("/all-habits", getAllHabits)
app.get("/all-habit-categories", getAllHabitCategories)
app.get("/all-countries", getAllCountries)
app.get("/all-blogs", getAllBlogs)

// AUTHENTICATION RELATED
app.get("/logout", getLogout)
app.delete("/delete-user", verifyToken, deleteUser)
app.post("/login-or-register", postLoginOrRegister)

// HABIT RELATED
app.get("/completed-habits", verifyToken, getCompletedHabits)
app.get("/all-completed-habits", getAllCompletedHabits)
app.get("/preview-completed-habits/:username", getPreviewCompletedHabits)

app.post("/complete-habit", verifyToken, postCompleteHabit)
app.delete("/remove-habit", verifyToken, deleteRemoveHabit)
app.get("/reset-habit-progress", verifyToken, getResetHabitProgress)
app.patch("/pin-habit", verifyToken, patchPinHabit)

app.patch("/add-priority-category", verifyToken, patchAddPriorityCategory)
app.patch("/remove-priority-category", verifyToken, patchRemovePriorityCategory)

// BLOGS RELATED
app.post("/add-blog", verifyToken, postAddBlog)
app.delete("/remove-blog", verifyToken, deleteBlog)

// USER SETTINGS
app.get("/user-settings", verifyToken, getUserSettings)
app.patch("/user-settings/change-theme", verifyToken, patchChangeTheme)
app.patch("/user-settings/change-country", verifyToken, patchChangeCountry)
app.patch("/user-settings/change-bio", verifyToken, patchChangeBio)
app.patch("/user-settings/change-creds", verifyToken, patchChangeCreds)
app.get("/check-username-availability/:username", getCheckUsernameAvailability)
app.patch(
  "/user-settings/change-profile-picture",
  verifyToken,
  upload.single("profilePicture"),
  patchChangeProfilePicture
)
app.delete(
  "/user-settings/delete-profile-picture",
  verifyToken,
  deleteProfilePicture
)

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 6000 * 1000
server.headersTimeout = 120 * 1000
