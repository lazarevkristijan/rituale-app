import sql from "../db.js"
import { nameRegex, emailRegex, passwordRegex } from "../Regex.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWTsecret } from "../middleware/verifyToken.js"

export const postRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const sameEmail = await sql`
    SELECT email
    FROM users
    WHERE email = ${email}
    `

  if (sameEmail.length !== 0) {
    return res
      .status(409)
      .send("Email is already assosiated with a different account")
  }

  if (
    !nameRegex.test(firstName) ||
    !nameRegex.test(lastName) ||
    !emailRegex.test(email) ||
    !passwordRegex.test(password)
  ) {
    return res.status(400).send("Incorrect registration data")
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await sql`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})
      RETURNING id`

    const token = jwt.sign({ userId }, JWTsecret)
    res.cookie("user", token, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 1,
    })

    const registeredUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    }

    return res.status(200).json(registeredUser)
  } catch (error) {
    console.log("Error during registration: ", error)
    return res.status(500).send("Registration failed")
  }
}

export const postLogin = async (req, res) => {
  const { email, password } = req.body

  const storedPassword = await sql`
    SELECT password
    FROM users
    WHERE email = ${email}`

  if (!Object.values(storedPassword).length) {
    return res.status(403).send("Email doesn't exist")
  }

  bcrypt.compare(password, storedPassword[0].password, async (err, result) => {
    if (err) {
      return res.status(500).send("Error comparing passwords: ", err)
    } else if (result) {
      const fetchedUser = await sql`
      SELECT id, first_name, last_name
      FROM users
      WHERE email = ${email}`

      const user = {
        id: fetchedUser[0].id,
        first_name: fetchedUser[0].first_name,
        last_name: fetchedUser[0].last_name,
        email: email,
      }

      const token = jwt.sign({ user: user.id }, JWTsecret)
      res.cookie("user", token, {
        httpOnly: true,
        domain: "localhost",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 1,
      })
      return res.status(200).json(user)
    } else {
      return res.status(403).send("Invalid password")
    }
  })
}
