import {
  Box,
  Button,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import MainLoadingScreen from "../skeletons/MainLoadingScreen"
import { useQuery } from "react-query"
import { PreviewUserTypes } from "../Types"
import { useNavigate, useParams } from "react-router-dom"
import { getPfpLink } from "../HelperFunctions/getPfpLink"
import { useDispatch, useSelector } from "react-redux"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { defaultPfpURL } from "../constants"
import { RootState } from "../Store"
const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(changeLocation(1))

  const { page: pageNoParams } = useParams()
  const [page, setPage] = useState(pageNoParams)

  const [searchValue, setSearchValue] = useState("")
  const [waitedValue, setWaitedValue] = useState("")
  useEffect(() => {
    const addValueTimeout = setTimeout(() => {
      setSearchValue(waitedValue)
    }, 500)

    return () => clearTimeout(addValueTimeout)
  }, [waitedValue])
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
        value={waitedValue}
        onChange={(e) => {
          console.log(e.target.value)
          if (window.location.href !== "http://localhost:5173/search/1") {
            navigate("/search/1")
          }
          setPage("1")
          console.log(e.target.value)
          setWaitedValue(e.target.value)
        }}
      />
      {isLoading ? (
        <MainLoadingScreen />
      ) : (
        <>
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
                    return profile.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  })
                  .slice((Number(page) - 1) * 15, Number(page) * 15)
                  .map((profile: PreviewUserTypes) => {
                    return (
                      <Box
                        sx={{
                          width: 300,
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
                          <Typography>
                            {profile.username} {profile.id}
                          </Typography>
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(
                allUsers.filter((profile: PreviewUserTypes) => {
                  return profile.username
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                }).length / 15
              )}
              onChange={(_e, value) => {
                setPage(String(value))
                navigate(`/search/${value}`)
              }}
              page={Number(page)}
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default Search
