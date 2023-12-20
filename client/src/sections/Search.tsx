import { Box, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import MainLoadingScreen from "../skeletons/MainLoadingScreen"
import { useQuery } from "react-query"
import { UserTypes } from "../Types"
const Search = () => {
  const [searchValue, setSearchValue] = useState("")

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5432/users")
    return res.data
  }
  const { data, isLoading, error } = useQuery("users", getUsers)

  return (
    <Box>
      <Typography variant="h2">Search users</Typography>
      <TextField
        fullWidth
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
      />
      {isLoading ? (
        <MainLoadingScreen />
      ) : (
        data.map((user: UserTypes) => user.first_name)
      )}
    </Box>
  )
}

export default Search
