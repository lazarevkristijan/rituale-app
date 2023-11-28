import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const JWTsecret = process.env.JWT_SECRET

export const verifyToken = (req, res, next) => {
  const token = req.cookies.user

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" })
  }

  jwt.verify(token, JWTsecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" })
    }

    req.userId = decoded.userId
    next()
  })
}
