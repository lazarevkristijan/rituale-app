import sql from "../db.js"

export const patchChangeTheme = async (req, res) => {
  const { theme } = req.body

  await sql`
    UPDATE user_settings
    SET value = ${theme}
    WHERE setting_id = 1 AND user_id = ${req.userId}`

  return res.status(200).json({ theme: theme })
}
