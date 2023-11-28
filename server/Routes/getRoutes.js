import sql from "../db.js"

export const getRoot = (req, res) => res.send("DB ROOT")

export const getUsers = async (req, res) => {
  try {
    const users = await sql`
    SELECT *
    FROM users`
    return res.json(users)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: "Internal Server Error" })
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
