import sql from "../db.js"
import { nameRegex, emailRegex, passwordRegex } from "../Regex.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWTsecret } from "../middleware/verifyToken.js"
import { profanityRegex } from "../Regex.js"

export const postRegister = async (req, res) => {
  try {
    const { firstName, lastName, email: sentEmail, password } = req.body
    const email = sentEmail.toLowerCase()

    if (
      profanityRegex.test(firstName) ||
      profanityRegex.test(lastName) ||
      profanityRegex.test(email)
    ) {
      return res.status(400).json({ error: "Profanity word detected" })
    }

    const sameEmail = await sql`
    SELECT email
    FROM users
    WHERE email = ${email}`

    if (sameEmail.length !== 0) {
      return res
        .status(401)
        .json({ error: "Email is already assosiated with a different account" })
    }

    if (
      !nameRegex.test(firstName) ||
      !nameRegex.test(lastName) ||
      !emailRegex.test(email) ||
      !passwordRegex.test(password)
    ) {
      return res.status(401).json({ error: "Incorrect registration data" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await sql`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})
      RETURNING id`

    const token = jwt.sign({ userId: userId[0].id }, JWTsecret)
    res.cookie("user", token, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 1,
    })

    const registeredUser = await sql`
    SELECT * 
    FROM users
    WHERE email = ${email}`

    const userTheme = await sql`
    SELECT value
    FROM user_settings
    WHERE user_id = ${userId[0].id} AND setting_id = 1`

    res.cookie("theme", userTheme[0].value, {
      expires: new Date("9999-12-31T23:59:59"),
    })

    return res.json(registeredUser[0])
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when registering" })
  }
}

export const postLogin = async (req, res) => {
  try {
    const { email: defaultEmail, password } = req.body
    const email = defaultEmail.toLowerCase()
    const storedPassword = await sql`
    SELECT password
    FROM users
    WHERE email = ${email}`

    if (!storedPassword.length) {
      return res.status(401).json({ error: "Email doesn't exist" })
    }

    bcrypt.compare(
      password,
      storedPassword[0].password,
      async (err, result) => {
        if (err) {
          console.error("Error is: ", err)
          return res.status(500).json({ error: "Error comparing passwords" })
        } else if (result) {
          const user = await sql`
          SELECT a.id, a.first_name, a.last_name, a.email, a.bio, a.profile_picture, f.id as pinned_habit, e.country_name as country, b.category as priority_category_1, c.category as priority_category_2, d.category as priority_category_3 FROM users as a
          LEFT JOIN habit_categories as b ON a.priority_category_1 = b.id
          LEFT JOIN habit_categories as c ON a.priority_category_2 = c.id
          LEFT JOIN habit_categories as d ON a.priority_category_3 = d.id
          LEFT JOIN countries as e ON a.country = e.id
          LEFT JOIN habits as f ON a.pinned_habit = f.id
          WHERE email = ${email}`

          const token = jwt.sign({ userId: user[0].id }, JWTsecret)
          res.cookie("user", token, {
            httpOnly: true,
            domain: "localhost",
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 1,
          })

          const userTheme = await sql`
          SELECT value
          FROM user_settings
          WHERE user_id = ${user[0].id} AND setting_id = 1`
          res.cookie("theme", userTheme[0].value, {
            expires: new Date("9999-12-31T23:59:59"),
          })
          return res.json(user[0])
        } else {
          return res.status(401).json({ error: "Invalid password" })
        }
      }
    )
  } catch (error) {
    console.error("Error is: ", error)
    return res.status(500).json({ error: "Error when loggin in" })
  }
}

export const postAuth0Register = async (req, res) => {
  try {
    const { given_name, family_name, picture, email, sub } = req.body

    console.log(req.body)
    return req

    // const emailExists = await sql`
    // SELECT *
    // FROM users
    // WHERE email = ${email}`

    // if (emailExists) return res.json({ info: "User exists" })

    // await sql`
    // INSERT INTO users(first_name, email, profile_picture)`
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
