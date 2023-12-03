import sql from "../db.js"

export const patchChangeTheme = async (req, res) => {
  try {
    const { theme } = req.body

    await sql`
  UPDATE user_settings
  SET value = ${theme}
  WHERE setting_id = 1 AND user_id = ${req.userId}`

    return res.json({ theme: theme })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error changing theme" })
  }
}
