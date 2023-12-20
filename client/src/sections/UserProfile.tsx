import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useEffect, useState } from "react"
import { UserTypes } from "../Types"
import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material"
import { RootState } from "../Store"
import React from "react"
import { countryShorthands } from "../constants"

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  dispatch(changeLocation(2))

  const { id } = useParams()

  const user = useSelector((state: RootState) => state.session.user)
  const darkTheme = useSelector((state: RootState) => state.settings.colorTheme)
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits
  )

  const [userData, setUserData] = useState<UserTypes | null>(null)

  console.log("user data: ", userData)
  console.log("user: ", user)
  useEffect(() => {
    axios.get(`http://localhost:5432/user/${id}`).then((response) => {
      setUserData(response.data)
      console.log(response.data)
    })
  }, [id])

  const displayBio = (bio: string | null | undefined) => {
    if (bio === null || bio === undefined) {
      return "NO BIO"
    }
    const formattedBio = bio.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
    return formattedBio
  }

  let pfpURL
  if (userData?.profile_picture) {
    const pfpData = JSON.parse(userData?.profile_picture)
    pfpURL = pfpData.url
  }

  return (
    <>
      <Typography variant="h3">{userData?.first_name}'s Profile</Typography>

      <Box
        sx={{
          bgcolor: `primary.${darkTheme ? "dark" : "light"}`,
          borderRadius: 1,
          p: 1,
          mb: 2,
          display: "flex",
        }}
      >
        <Box width="50%">
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                background: `url('${pfpURL}') no-repeat center/cover #fff`,
                width: 100,
                height: 100,
                borderRadius: 20,
                border: "3px solid black",
              }}
            ></Box>
            <Typography sx={{ alignSelf: "center", ml: 1, display: "flex" }}>
              {userData?.first_name} <br />
              {userData?.last_name} <br />
              {userData?.email} <br />
              {userData?.country || "NO COUNTRY"}
            </Typography>
            <Tooltip
              title="User No."
              placement="bottom"
              arrow
              sx={{ ml: 1 }}
            >
              <Chip
                label={`#${userData?.id}`}
                color="primary"
                component="span"
              />
            </Tooltip>
          </Box>
          <Typography>
            Good Habits:{" "}
            <Typography component="span">
              {completedHabits.habits.length}
            </Typography>
          </Typography>
          <Typography component="span">
            Main Goals:{" "}
            {!userData?.priority_category_1 &&
              !userData?.priority_category_2 &&
              !userData?.priority_category_3 &&
              "None"}{" "}
          </Typography>
          {userData?.priority_category_1 && (
            <Chip
              label={userData.priority_category_1}
              color="primary"
              component="span"
              sx={{ ml: 1 }}
            />
          )}
          {userData?.priority_category_2 && (
            <Chip
              label={userData.priority_category_2}
              color="primary"
              component="span"
              sx={{ ml: 1 }}
            />
          )}
          {userData?.priority_category_3 && (
            <Chip
              label={userData.priority_category_3}
              color="primary"
              component="span"
              sx={{ ml: 1 }}
            />
          )}
          <br />
          <br />
          <Typography component="p">{displayBio(userData?.bio)}</Typography>
        </Box>

        <Box
          width="50%"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userData?.country && (
            <Box
              component="img"
              src={`/flags/${
                countryShorthands[
                  userData?.country as keyof typeof countryShorthands
                ]
              }.svg`}
              width={150}
              height={150}
            />
          )}
        </Box>
      </Box>
      <Stack
        spacing={1}
        direction="row"
      >
        <Button onClick={() => navigate("/settings")}>settings</Button>
      </Stack>
    </>
  )
}

export default UserProfile
