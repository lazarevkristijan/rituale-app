import sql from "../db.js"
import { cloudinary } from "../cloudinary/index.js"

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId

    await sql`
    DELETE FROM users
    WHERE id = ${userId}`

    res.clearCookie("user")
    res.clearCookie("theme")

    return res.json({ success: "Successfully deleted user" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when deleting user" })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const userId = req.userId
    if (userId !== 113)
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

export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.userId
    const picturePath = req.body.pfpFileName

    await sql`
    UPDATE users
    SET profile_picture = 'https://drive.google.com/uc?id=18he4mgr-Nu_RE4btnjEfi7B-_pAwu5MO'
    WHERE id = ${userId}`

    if (picturePath) {
      cloudinary.uploader.destroy(picturePath)
    }

    return res.json({ success: "Successfully deleted profile picture" })
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error when deleting profile picture" })
  }
}
