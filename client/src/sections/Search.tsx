import {
  Box,
  Button,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import MainLoadingScreen from "../skeletons/MainLoadingScreen"
import { useQuery } from "react-query"
import { UserTypes } from "../Types"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { defaultPfpURL } from "../constants"
import { RootState } from "../Store"
import { getUsers } from "../Utils/SearchUtils"
import { getPfpLink } from "../Utils/SettingsUtils"

const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeNavbarLocation(1))
  }, [dispatch])

  const { page: pageNoParams } = useParams()
  const [page, setPage] = useState(pageNoParams)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  const [searchValue, setSearchValue] = useState("")
  const [waitedValue, setWaitedValue] = useState("")

  useEffect(() => {
    const addValueTimeout = setTimeout(() => {
      setSearchValue(waitedValue)
    }, 500)

    return () => clearTimeout(addValueTimeout)
  }, [waitedValue])

  const { data: allUsers, isLoading: areUsersLoading } = useQuery(
    "users",
    getUsers
  )

  const tld = "https://rituale.digital/"

  return (
    <Box>
      <Typography variant="h2">Search users</Typography>
      <TextField
        fullWidth
        label="Username"
        autoComplete="off"
        placeholder="Who?"
        value={waitedValue}
        onChange={(e) => {
          if (window.location.href !== `${tld}search/1`) {
            navigate("/search/1")
          }
          if (page !== "1") {
            setPage("1")
          }
          setWaitedValue(e.target.value)
        }}
      />
      {areUsersLoading ? (
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
            {allUsers &&
            allUsers.filter((profile: UserTypes) =>
              profile.username.toLowerCase().includes(searchValue.toLowerCase())
            ).length !== 0
              ? allUsers
                  .filter((profile: UserTypes) =>
                    profile.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .slice((Number(page) - 1) * 15, Number(page) * 15)
                  .map((profile: UserTypes) => {
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
                              navigate(`/user/${profile.username}`)
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
                allUsers.filter((profile: UserTypes) => {
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
