import { emailRegex, nameRegex, passwordRegex } from "../Regex.js"
import sql from "../db.js"
import bcrypt from "bcrypt"

export const patchChangeTheme = async (req, res) => {
  try {
    const userId = req.userId
    const { theme } = req.body
    const themeCookie = req.cookies.theme
    console.log("themecookie: ", themeCookie)
    if (themeCookie) {
      res.clearCookie("theme")
    }

    await sql`
  UPDATE user_settings
  SET value = ${theme}
  WHERE setting_id = 1 AND user_id = ${userId}`

    res.cookie("theme", theme)
    return res.json({ theme: theme })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error changing theme" })
  }
}

export const patchChangeCreds = async (req, res) => {
  try {
    const userId = req.userId
    let updatedUser = {}

    const user = await sql`
     SELECT *
     FROM users
     WHERE id = ${userId}`

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
      WHERE id = ${userId}`

      updatedUser = { ...updatedUser, first_name: firstName }
    }
    if (user[0].last_name !== lastName) {
      await sql`
      UPDATE users 
      SET last_name = ${lastName}
      WHERE id = ${userId}`

      updatedUser = { ...updatedUser, last_name: lastName }
    }
    if (user[0].email !== email) {
      await sql`
      UPDATE users 
      SET email = ${email}
      WHERE id = ${userId}`

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
      WHERE id = ${userId}`

      updatedUser = { ...updatedUser, password: hashedPassword }
    }

    return res.json(updatedUser)
  } catch (error) {
    console.error("Error is: ", error)
    res.status(500).json({ error: "Error when changing user data" })
  }
}

export const patchChangeLanguage = async (req, res) => {
  try {
    const userId = req.userId
    const { language } = req.body

    await sql`
    UPDATE user_settings
    SET value = ${language}
    WHERE user_id = ${userId} AND setting_id = 2`
  } catch (error) {
    console.error("Error is: ", error)
    res.status(500).json({ error: "Error when changing language" })
  }
}

export const patchAddPriorityCategory = async (req, res) => {
  try {
    const { cat1, cat2, cat3, idCatToChange } = req.body
    const userId = req.userId

    if (!cat1) {
      await sql`
      UPDATE users
      SET priority_category_1 = ${idCatToChange}
      WHERE id = ${userId}`
    } else if (!cat2) {
      await sql`
      UPDATE users
      SET priority_category_2 = ${idCatToChange}
      WHERE id = ${userId}`
    } else if (!cat3) {
      await sql`
      UPDATE users
      SET priority_category_3 = ${idCatToChange}
      WHERE id = ${userId}`
    } else {
      return res
        .status(401)
        .json({ error: "Error adding a new priority category" })
    }
    return res.json({ success: "Added a new priority category" })
  } catch (error) {
    console.error("Error is: ", error)
    res.status(500).json({ error: "Error when adding priority category" })
  }
}

export const patchRemovePriorityCategory = async (req, res) => {
  try {
    const { category_1, category_2, category_3 } = req.body
    const userId = req.userId

    if (category_1) {
      await sql`
      UPDATE users
      SET priority_category_1 = NULL
      WHERE id = ${userId}`
    } else if (category_2) {
      await sql`
      UPDATE users
      SET priority_category_2 = NULL
      WHERE id = ${userId}`
    } else if (category_3) {
      await sql`
      UPDATE users
      SET priority_category_3 = NULL
      WHERE id = ${userId}`
    } else {
      return res.status(401).json({ error: "Error removing priority category" })
    }
    return res.json({ success: "Successfully removed a priority category" })
  } catch (error) {
    console.error("Error is: ", error)
    res.status(500).json({ error: "Error when removing priority category" })
  }
}

export const patchChangeCountry = async (req, res) => {
  try {
    const userId = req.userId
    const { country } = req.body

    const fetchedCountry = await sql`
    SELECT *
    FROM countries
    WHERE country_name = ${country}`

    await sql`
    UPDATE users
    SET country = ${fetchedCountry[0].id}
    WHERE id = ${userId}`

    return res.json({ success: "Successfully changed country" })
  } catch (error) {
    console.error("Error is: ", error)
    res.status(500).json({ error: "Error when changing country" })
  }
}

export const patchChangeBio = async (req, res) => {
  try {
    const userId = req.userId
    const { bio } = req.body

    if (bio.length > 200) {
      return res.status(400).json({ error: "Bio is over 200 characters" })
    }

    await sql`
    UPDATE users
    SET bio = ${bio}
    WHERE id = ${userId}`

    return res.json({ success: "Successfully changed bio" })
  } catch (error) {
    console.error("Error is: ", error)
    res.status(500).json({ error: "Error when changing bio" })
  }
}

export const patchChangeProfilePicture = async (req, res) => {
  try {
    const userId = req.userId

    const pfpData = { url: req.file.path, fileName: req.file.filename }
    const stringedPfp = JSON.stringify(pfpData)

    await sql`
    UPDATE users
    SET profile_picture = ${stringedPfp}
    WHERE id = ${userId}`

    return res.json(stringedPfp)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error when changing profile picture" })
  }
}
