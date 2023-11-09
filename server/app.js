const express = require("express")
const sql = require("./db")

const app = express()
const port = process.env.PORT || 3000

const server = app.listen(port, () =>
  console.log(`Rituale db is listening on port ${port}!`)
)

server.keepAliveTimeout = 120 * 1000
server.headersTimeout = 120 * 1000

app.get("/api/users", async (req, res) => {
  try {
    const users = await sql`
    SELECT *
    FROM users
    `
    res.json(users)
  } catch (error) {
    console.error("Error fetching users: ", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
