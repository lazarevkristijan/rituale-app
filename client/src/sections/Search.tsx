import { Box, Grid, Pagination, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CardsSkeleton } from "../skeletons"
import { useQuery } from "react-query"
import { UserTypes } from "../Types"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { RootState } from "../Store"
import { getUsers } from "../Utils/SearchUtils"
import { UserCard } from "../components/SearchComponents"

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

  return (
    <Box component="section">
      <Typography variant="h2">Search users</Typography>
      <TextField
        fullWidth
        label="Username"
        autoComplete="off"
        placeholder="Who?"
        value={waitedValue}
        onChange={(e) => {
          if (window.location.href !== "https://rituale.digital/search/1") {
            navigate("/search/1")
          }
          if (page !== "1") {
            setPage("1")
          }
          setWaitedValue(e.target.value)
        }}
      />
      {areUsersLoading ? (
        <CardsSkeleton />
      ) : (
        <>
          <Grid
            gap={2}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              my: 2,
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
                      <UserCard
                        profile={profile}
                        key={profile.id}
                        theme={colorTheme}
                      />
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
