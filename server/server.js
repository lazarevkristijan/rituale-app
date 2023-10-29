const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())

const db = mysql.createConnection({
  host: "rituale-db.cg8dgsim4sgu.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "kicoKICO541>",
  database: "rituale",
})

db.connect((err) => {
  if (err) console.error("Database connection faild: " + err.message)
  else console.log("Connected to the database")
})

app.listen(5174, () => {
  console.log("Server is listening on port 5174")
})

app.get("http://localhost:5174/api/data", (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).send("Error fetching data from the database")
    } else {
      res.json(results)
    }
  })
})
