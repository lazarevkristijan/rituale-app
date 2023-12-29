import sql from "../db.js"

export const postLoginOrRegister = async (req, res) => {
  try {
    const { given_name, family_name, picture, email } = req.body

    const existingUser = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}`

    if (existingUser.length) return res.json(existingUser)

    const newUser =
      await sql`INSERT INTO users(first_name, last_name, email, profile_picture)
    VALUES(${given_name}, ${family_name}, ${email}, ${picture})
    RETURNING bio, country, id, pinned_habit, priority_category_1, priority_category_2, priority_category_3, profile_picture`

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
