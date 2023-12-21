import sql from "../db.js"

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId

    await sql`
        DELETE FROM users
        WHERE id = ${userId}`

    res.clearCookie("user")
    return res.json({ success: "Successfully deleted user" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when deleting user" })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const userId = req.userId
    if (userId !== 52)
      return res
        .status(400)
        .json({ error: "Insufficient privileges to remove blog" })

    const blogId = req.body.id

    await sql`
    DELETE FROM blogs
    WHERE id = ${blogId}`

    return res.json({ success: "Successfully deleted blog" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when deleting blog" })
  }
}
