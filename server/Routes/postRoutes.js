import sql from "../db.js"
import jwt from "jsonwebtoken"
import { JWTsecret } from "../middleware/verifyToken.js"
export const postLoginOrRegister = async (req, res) => {
  try {
    const { given_name, family_name, picture, email } = req.body

    const existingUser = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.bio, a.profile_picture, f.id as pinned_habit, e.country_name as country, b.category as priority_category_1, c.category as priority_category_2, d.category as priority_category_3 FROM users as a
    LEFT JOIN habit_categories as b ON a.priority_category_1 = b.id
    LEFT JOIN habit_categories as c ON a.priority_category_2 = c.id
    LEFT JOIN habit_categories as d ON a.priority_category_3 = d.id
    LEFT JOIN countries as e ON a.country = e.id
    LEFT JOIN habits as f ON a.pinned_habit = f.id
    WHERE email = ${email}`

    if (existingUser.length) {
      const token = jwt.sign({ userId: existingUser[0].id }, JWTsecret)

      const userTheme = await sql`
      SELECT value
      FROM user_settings
      WHERE user_id = ${existingUser[0].id} AND setting_id = 1`

      const cookieOptions = {
        httpOnly: true,
        domain: "localhost",
        path: "/",
      }

      res.cookie("user", token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24 * 1,
      })
      res.cookie("theme", userTheme[0].value, {
        ...cookieOptions,
        expires: new Date("9999-12-31T23:59:59"),
      })
      return res.json(existingUser)
    }

    await sql`
    INSERT INTO users(first_name, last_name, email, profile_picture)
    VALUES(${given_name}, ${family_name}, ${email}, ${picture})`

    const newUser = await sql`
    SELECT a.id, a.first_name, a.last_name, a.email, a.bio, a.profile_picture, f.id as pinned_habit, e.country_name as country, b.category as priority_category_1, c.category as priority_category_2, d.category as priority_category_3 FROM users as a
    LEFT JOIN habit_categories as b ON a.priority_category_1 = b.id
    LEFT JOIN habit_categories as c ON a.priority_category_2 = c.id
    LEFT JOIN habit_categories as d ON a.priority_category_3 = d.id
    LEFT JOIN countries as e ON a.country = e.id
    LEFT JOIN habits as f ON a.pinned_habit = f.id
    WHERE email = ${email}`

    const token = jwt.sign({ userId: newUser[0].id }, JWTsecret)

    const userTheme = await sql`
    SELECT value
    FROM user_settings
    WHERE user_id = ${newUser[0].id} AND setting_id = 1`

    const cookieOptions = {
      httpOnly: true,
      domain: "localhost",
      path: "/",
    }

    res.cookie("user", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 1,
    })
    res.cookie("theme", userTheme[0].value, {
      ...cookieOptions,
      expires: new Date("9999-12-31T23:59:59"),
    })

    return res.json(newUser)
  } catch (error) {
    console.error("Error is: ", error)
    return res
      .status(500)
      .json({ error: "Error when logging in or registering" })
  }
}

export const postCompleteHabit = async (req, res) => {
  try {
    const { habitId, date } = req.body
    const userId = req.userId

    await sql`
    INSERT INTO completed_habits(user_id, habit_id, completion_date)
    VALUES (${userId}, ${habitId}, ${date})`
    return res.json({ success: "Successfully added new habit" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when completing habit" })
  }
}

export const postRemoveHabit = async (req, res) => {
  try {
    const { habitId } = req.body
    const userId = req.userId

    await sql`
    DELETE FROM completed_habits
    WHERE user_id = ${userId} AND habit_id = ${habitId}`
    return res.json({ success: "Successfully removed habit" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when removing habit" })
  }
}

export const postAddBlog = async (req, res) => {
  try {
    const userId = req.userId
    if (userId !== 52)
      return res
        .status(400)
        .json({ error: "Insufficient privileges to add blog" })

    const { title, author, link, image_url } = req.body
    const date_posted = new Date().toISOString().split("T")[0]

    await sql`
    INSERT INTO blogs (title, author, date_posted, link, image_url)
    VALUES (${title}, ${author}, ${date_posted}, ${link}, ${image_url})`

    return res.json({ success: "Successfully added blog" })
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when adding blog" })
  }
}
