import { Box, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { UserTypes } from "../Types"

const Search = () => {
  const [users, setUsers] = useState<UserTypes[] | null>(null)

  useEffect(() => {
    axios.get("http://localhost:5432/users").then((response) => {
      setUsers(response.data)
    })
  }, [])

  console.log(users)

  return (
    <Box>
      <Typography variant="h2">Search users</Typography>
      <TextField fullWidth />
    </Box>
  )
}

export default Search
