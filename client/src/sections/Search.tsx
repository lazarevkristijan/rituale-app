import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import MainLoadingScreen from "../skeletons/MainLoadingScreen"
import { useQuery } from "react-query"
import { PreviewUserTypes } from "../Types"
import { useNavigate } from "react-router-dom"
import { getPfpLink } from "../HelperFunctions/getPfpLink"
import { useDispatch, useSelector } from "react-redux"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { defaultPfpURL } from "../constants"
import { RootState } from "../Store"
const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(changeLocation(1))
  const [searchValue, setSearchValue] = useState("")
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5432/all-users", {
      withCredentials: true,
    })
    return res.data
  }
  const { data: allUsers, isLoading } = useQuery("users", getUsers)

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
          {allUsers.length
            ? allUsers
                .filter((profile: PreviewUserTypes) => {
                  const fullName = `${profile.first_name} ${profile.last_name}`

                  return fullName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                })
                .map((profile: PreviewUserTypes) => {
                  return (
                    <Box
                      sx={{
                        width: 300,
                        height: 200,
                        bgcolor: `primary.${colorTheme}`,
                        borderRadius: 2,
                        p: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      key={profile.id}
                    >
                      <Box>
                        <Box
                          component="img"
                          src={getPfpLink(
                            profile.profile_picture || defaultPfpURL
                          )}
                          width={50}
                          height={50}
                          borderRadius={20}
                          sx={{ border: "3px solid black", bgcolor: "#fff" }}
                        />
                        <Typography component="span">
                          Full name: {profile.first_name} {profile.last_name}
                        </Typography>
                        <Typography>Country: {profile.country}</Typography>
                        <Typography>
                          Main focus:{" "}
                          {profile.priority_category_1 &&
                            profile.priority_category_1 + ", "}
                          {profile.priority_category_2 &&
                            profile.priority_category_2 + ", "}{" "}
                          {profile.priority_category_2 &&
                            profile.priority_category_3}
                          {!profile.priority_category_1 &&
                            !profile.priority_category_2 &&
                            !profile.priority_category_3 &&
                            "None"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          onClick={() => {
                            navigate(`/user/${profile.id}`)
                          }}
                        >
                          view
                        </Button>
                      </Box>
                    </Box>
                  )
                })
            : "No users"}
        </Grid>
      )}
    </Box>
  )
}

export default Search
