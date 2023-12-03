import sql from "../db.js"

export const patchChangeTheme = async (req, res) => {
  const { theme } = req.body

  await sql`
    UPDATE usersettings
    SET value = ${theme}
    WHERE settingid = 1 AND userid = ${req.userId}`

  return res.status(200).json({ theme: theme })
}
