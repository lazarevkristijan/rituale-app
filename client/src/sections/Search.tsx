import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import MainLoadingScreen from "../skeletons/MainLoadingScreen"
import { useQuery } from "react-query"
import { UserTypes } from "../Types"
import { useNavigate } from "react-router-dom"
import { getPfpLink } from "../HelperFunctions/getPfpLink"
const Search = () => {
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()
  const getUsers = async () => {
    const res = await axios.get("http://localhost:5432/users", {
      withCredentials: true,
    })
    return res.data
  }
  const { data, isLoading } = useQuery("users", getUsers)

  return (
    <Box>
      <Typography variant="h2">Search users</Typography>
      <TextField
        fullWidth
        label="User"
        autoComplete="off"
        placeholder="Who?"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
      />
      {isLoading ? (
        <MainLoadingScreen />
      ) : (
        <Grid
          gap={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {data
            .filter((user: UserTypes) => {
              const fullName = `${user.first_name} ${user.last_name}`

              return fullName.toLowerCase().includes(searchValue.toLowerCase())
            })
            .map((user: UserTypes) => {
              return (
                <Box
                  sx={{
                    width: 300,
                    height: 200,
                    bgcolor: "primary.dark",
                    borderRadius: 2,
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  key={user.id}
                >
                  <Box>
                    <Box
                      component="img"
                      src={
                        user.profile_picture && getPfpLink(user.profile_picture)
                      }
                      width={50}
                      height={50}
                      borderRadius={20}
                      sx={{ border: "3px solid black", bgcolor: "#fff" }}
                    />
                    <Typography component="span">
                      Full name: {user.first_name} {user.last_name}
                    </Typography>
                    <Typography>Country: {user.country}</Typography>
                    <Typography>
                      Main focus:{" "}
                      {user.priority_category_1 &&
                        user.priority_category_1 + ", "}
                      {user.priority_category_2 &&
                        user.priority_category_2 + ", "}{" "}
                      {user.priority_category_2 && user.priority_category_3}
                      {!user.priority_category_1 &&
                        !user.priority_category_2 &&
                        !user.priority_category_3 &&
                        "None"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      onClick={() => {
                        navigate(`/user/${user.id}`)
                      }}
                    >
                      view
                    </Button>
                  </Box>
                </Box>
              )
            })}
        </Grid>
      )}
    </Box>
  )
}

export default Search
