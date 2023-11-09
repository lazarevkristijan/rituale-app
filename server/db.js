import postgres from "postgres"

const sql = postgres({
  host: "dpg-cl57qb472pts739ttd00-a.frankfurt-postgres.render.com",
  port: 5432,
  database: "rituale",
  username: "kristijan",
  password: "jLYVLhAqZOD5bfQ1p8fbW4nh322moCmw",
  ssl: true,
})

export default sql
