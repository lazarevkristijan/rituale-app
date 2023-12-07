import { emailRegex, nameRegex, passwordRegex } from "../Regex.js"
import sql from "../db.js"
import bcrypt from "bcrypt"

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

export const patchChangeUserData = async (req, res) => {
  try {
    const { id } = req.params
    let updatedUser = {}

    const user = await sql`
     SELECT *
     FROM users
     WHERE id = ${id}`

    const {
      firstName,
      lastName,
      email,
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = req.body

    if (user[0].email !== email) {
      const sameEmail = await sql`
      SELECT email
      FROM users
      WHERE email = ${email}`

      if (sameEmail.length !== 0) {
        return res.status(401).json({
          error: "Email is already assosiated with a different account",
        })
      }
    }

    if (
      !nameRegex.test(firstName) ||
      !nameRegex.test(lastName) ||
      !emailRegex.test(email)
    ) {
      return res
        .status(401)
        .json({ error: "First name, last name or email have invalid format" })
    }

    if (user[0].first_name !== firstName) {
      await sql`
      UPDATE users 
      SET first_name = ${firstName}
      WHERE id = ${id}`

      updatedUser = { ...updatedUser, first_name: firstName }
    }
    if (user[0].last_name !== lastName) {
      await sql`
      UPDATE users 
      SET last_name = ${lastName}
      WHERE id = ${id}`

      updatedUser = { ...updatedUser, last_name: lastName }
    }
    if (user[0].email !== email) {
      await sql`
      UPDATE users 
      SET email = ${email}
      WHERE id = ${id}`

      updatedUser = { ...updatedUser, email: email }
    }

    if (oldPassword || newPassword || confirmNewPassword) {
      if (
        !passwordRegex.test(oldPassword) ||
        !passwordRegex.test(newPassword) ||
        !passwordRegex.test(confirmNewPassword)
      ) {
        return res
          .status(401)
          .json({ error: "passwords are not formatted correctly" })
      }

      bcrypt.compare(oldPassword, user[0].password, async (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error when comparing passwords" })
        } else if (!result) {
          return res.status(401).json({ error: "Old password isn't correct" })
        }
      })

      if (oldPassword === newPassword) {
        return res.status(401).json({ error: "Old and new password are same" })
      } else if (newPassword !== confirmNewPassword) {
        return res.status(401).json({
          error: "New password and confirmed new password don't match",
        })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE id = ${id}`

      updatedUser = { ...updatedUser, password: hashedPassword }
    }

    console.log("Updated User", updatedUser)
    return res.json(updatedUser)
  } catch (error) {
    console.error("Error is: ", error)
    res.status(500).json({ error: "Error when changing user data" })
  }
}

export const patchChangeLanguage = async (req, res) => {
  const { id } = req.userId

  await sql`
  UPDATE user_settings
  SET language = ''
  WHERE user_id = ${id}`
}
