import sql from "../db.js"

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId

    await sql`
        DELETE FROM users
        WHERE id = ${userId}`

    res.clearCookie("user")
    return res.json({ success: "User successfully deleted" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when deleting user" })
  }
}
