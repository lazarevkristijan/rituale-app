import sql from "../db.js"

export const getRoot = (req, res) => res.send("DATABASE ROOT")

export const getUsers = async (req, res) => {
  try {
    const users = await sql`
    SELECT *
    FROM users`
    return res.json(users)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all users" })
  }
}

export const getHabits = async (req, res) => {
  try {
    const habits = await sql`
    SELECT a.id,a.description,a.difficulty,b.category as category_1, c.category as category_2, d.category as category_3 FROM habits as a
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
    const { id } = req.params
    const completedHabits = await sql`
    SELECT *
    FROM completed_habits
    WHERE user_id = ${id}`
    return res.json(completedHabits)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting all completed habits" })
  }
}

export const getCheckAuth = async (req, res) => {
  try {
    const user = await sql`
    SELECT a.id,a.first_name,a.last_name,a.email,a.password, b.category as priority_category_1, c.category as priority_category_2, d.category as priority_category_3 FROM users as a
    LEFT JOIN habit_categories as b ON a.priority_category_1 = b.id
    LEFT JOIN habit_categories as c ON a.priority_category_2 = c.id
    LEFT JOIN habit_categories as d ON a.priority_category_3 = d.id
    WHERE a.id = ${req.userId}`

    return res.json({ user: user[0] })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error checking auth" })
  }
}

export const getLogout = async (req, res) => {
  try {
    res.clearCookie("user")
    return res.json({ success: 'Session cookie "user" deleted successfully ' })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error logging out" })
  }
}

export const getResetHabitProgress = async (req, res) => {
  try {
    const { userId } = req

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
    const { id } = req.params

    const userSettings = await sql`
    SELECT *
    FROM user_settings
    WHERE user_id = ${id}`

    return res.json(userSettings)
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error getting user settings" })
  }
}
