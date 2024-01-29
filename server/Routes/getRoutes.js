import sql from "../db.js"
import { cookieOptions } from "../constants/index.js"

export const getRoot = (req, res) => res.send("DATABASE ROOT")

export const getCookieConsent = async (req, res) => {
  try {
    const consentCookie = req.cookies.consentCookie

    if (!consentCookie) {
      return res.json({ error: "No consent cookie" })
    }

    return res.json({ success: "Consent cookies accepted" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting cookie consent" })
  }
}

export const getAcceptConsentCookies = async (req, res) => {
  try {
    res.cookie("consentCookie", "accepted", {
      ...cookieOptions,
      expires: new Date("9999-12-31T23:59:59"),
    })
    return res.json({ success: "Successfully added consent cookie" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when accepting cookies" })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.username, a.bio, a.profile_picture, a.pinned_habit, e.country_name as country, b.category as priority_category_1, c.category as priority_category_2, d.category as priority_category_3 FROM users as a
    LEFT JOIN habit_categories as b ON a.priority_category_1 = b.id
    LEFT JOIN habit_categories as c ON a.priority_category_2 = c.id
    LEFT JOIN habit_categories as d ON a.priority_category_3 = d.id
    LEFT JOIN countries as e ON a.country = e.id`

    return res.json(users)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all users" })
  }
}

export const getUser = async (req, res) => {
  try {
    const username = req.params.username

    const user = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.username, a.bio, a.profile_picture, f.id as pinned_habit, e.country_name as country, b.category as priority_category_1, c.category as priority_category_2, d.category as priority_category_3 FROM users as a
    LEFT JOIN habit_categories as b ON a.priority_category_1 = b.id
    LEFT JOIN habit_categories as c ON a.priority_category_2 = c.id
    LEFT JOIN habit_categories as d ON a.priority_category_3 = d.id
    LEFT JOIN countries as e ON a.country = e.id
    LEFT JOIN habits as f ON a.pinned_habit = f.id
    WHERE a.username = ${username}`

    return res.json(user[0])
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting user" })
  }
}

export const getAllHabits = async (req, res) => {
  try {
    const habits = await sql`
    SELECT a.id, a.description, a.difficulty, b.category as category_1, c.category as category_2, d.category as category_3 FROM habits as a
    LEFT JOIN habit_categories as b ON a.category_1 = b.id 
    LEFT JOIN habit_categories as c ON a.category_2 = c.id 
    LEFT JOIN habit_categories as d ON a.category_3 = d.id`

    return res.json(habits)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error geting all habits" })
  }
}

export const getCompletedHabits = async (req, res) => {
  try {
    const userId = req.userId

    const completedHabits = await sql`
    SELECT *
    FROM completed_habits
    WHERE user_id = ${userId}`

    return res.json(completedHabits)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error getting user's completed habits" })
  }
}

export const getAllCompletedHabits = async (req, res) => {
  try {
    const allCompletedHabits = await sql`
    SELECT *
    FROM completed_habits`

    return res.json(allCompletedHabits)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all completed habits" })
  }
}

export const getPreviewCompletedHabits = async (req, res) => {
  try {
    const username = req.params.username

    const newCompletedHabits = await sql`
    SELECT a.habit_id
    FROM completed_habits as a
    JOIN users as b
    ON a.user_id = b.id
    WHERE b.username = ${username}`

    res.json(newCompletedHabits)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({
      error: "Error getting all previewed user's completed habits",
    })
  }
}

export const getAllFinishedProfiles = async (req, res) => {
  try {
    const finishedProfiles = await sql`
    SELECT c.id
    FROM users as c
    WHERE NOT EXISTS (
        SELECT h.id
        FROM habits as h
        WHERE NOT EXISTS (
            SELECT 1
            FROM completed_habits as a
            WHERE a.habit_id = h.id AND a.user_id = c.id
        )
    )`

    return res.json(finishedProfiles)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({
      error: "Error getting all current previewed user's completed habits",
    })
  }
}

export const getLogout = async (req, res) => {
  try {
    res.clearCookie("user")
    res.clearCookie("theme")
    return res.json({ success: "Cookies cleared, logging user out" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error logging out" })
  }
}

export const getResetHabitProgress = async (req, res) => {
  try {
    const userId = req.userId

    await sql`
    DELETE FROM completed_habits
    WHERE user_id = ${userId}`

    return res.json({ success: "Habit progress reset" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error reseting habit progress" })
  }
}

export const getUserSettings = async (req, res) => {
  try {
    const userId = req.userId

    const userSettings = await sql`
    SELECT *
    FROM user_settings
    WHERE user_id = ${userId}`

    return res.json(userSettings)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting user settings" })
  }
}

export const getAllHabitCategories = async (req, res) => {
  try {
    const categories = await sql`
    SELECT *
    FROM habit_categories`

    return res.json(categories)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all habit categories" })
  }
}

export const getAllCountries = async (req, res) => {
  try {
    const countries = await sql`
    SELECT *
    FROM countries`

    return res.json(countries)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all countries" })
  }
}

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await sql`
    SELECT *
    FROM blogs`

    return res.json(blogs)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all blogs" })
  }
}

export const getCheckUsernameAvailability = async (req, res) => {
  try {
    const { username } = req.params

    const existingUsername = await sql`
    SELECT * FROM users
    WHERE username = ${username}`

    if (existingUsername.length !== 0) {
      return res.status(401).json({ error: "Username not available" })
    } else {
      return res.json({ success: "Username available" })
    }
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all blogs" })
  }
}
