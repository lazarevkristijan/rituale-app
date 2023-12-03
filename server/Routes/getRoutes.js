import sql from "../db.js"

export const getRoot = (req, res) => res.send("DB ROOT")

export const getUsers = async (req, res) => {
  try {
    const users = await sql`
    SELECT *
    FROM users`
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getHabits = async (req, res) => {
  try {
    const habits = await sql`
    SELECT *
    FROM habits`
    return res.json(habits)
  } catch (error) {
    return res.status(500).json({ error: "Error geting all habits" })
  }
}

export const getCompletedHabits = async (req, res) => {
  try {
    const { id } = req.params
    const completedHabits = await sql`
    SELECT *
    FROM completedHabits
    WHERE userid = ${id}`
    return res.json(completedHabits)
  } catch (error) {
    return res.status(500).json({ error: "Error getting all completed habits" })
  }
}

export const getCheckAuth = async (req, res) => {
  const user = await sql`
  SELECT *
  FROM users
  WHERE id = ${req.userId}`

  return res
    .status(200)
    .json({ message: "User is authenticated", user: user[0] })
}

export const getLogout = async (req, res) => {
  res.clearCookie("user")
  return res.status(200).send('Session cookie "user" deleted successfully ')
}

export const getResetHabitProgress = async (req, res) => {
  const { userId } = req

  await sql`
  DELETE FROM completedHabits
  WHERE userid = ${userId}`

  return res.status(200).send("Habit progress reset")
}

export const getUserSettings = async (req, res) => {
  const { id } = req.params

  const userSettings = await sql`
  SELECT *
  FROM usersettings
  WHERE userid = ${id}`

  return res.json(userSettings)
}
