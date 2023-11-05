const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())

const db = mysql.createConnection({
  host: "rituale-db.cdyyw7qt0alr.eu-central-1.rds.amazonaws.com",
  user: "admin",
  password: "kicoKICO541>",
  database: "rituale",
  port: 3306,
})

db.connect((err) => {
  if (err) console.error("Database connection faild: " + err.message)
  else console.log("Connected to the database")
})

app.listen(5174, () => {
  console.log("Server is listening on port 5174")
})

app.get("/api/userData", (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    error
      ? res.status(500).send("Error fetching data from the database")
      : res.json(results)
  })
})

app.get("/api/habitsData", (req, res) => {
  db.query("SELECT * FROM habits", (error, results) => {
    error
      ? res.status(500).send("Error fetching data from the database")
      : res.json(results)
  })
})
