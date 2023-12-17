import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import { deepPurple } from "@mui/material/colors"
import SettingsIcon from "@mui/icons-material/Settings"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/session/sessionSlice"
import LogoutIcon from "@mui/icons-material/Logout"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import axios from "axios"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import { changeColorTheme } from "../features/settings/settingsSlice"
import { countryShorthands } from "../constants"
import { ProfileSkeleton } from "../components"
import React from "react"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.session.user)
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits
  )
  const darkTheme = useSelector((state: RootState) => state.settings.colorTheme)

  useEffect(() => {
    !user ? navigate("/login") : setIsLoading(false)
  }, [navigate, user])

  const [isLoading, setIsLoading] = useState(true)
  const handleLogout = async () => {
    await axios
      .get("http://localhost:5432/logout", { withCredentials: true })
      .then(() => {
        dispatch(logout())
        dispatch(clearHabits())
        dispatch(changeColorTheme("light"))
        document.body.style.backgroundColor = "#fff"
        navigate("/")
      })
  }

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

  return (
    <Box>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Typography variant="h3">{user?.first_name}'s Profile</Typography>
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
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {user?.first_name.charAt(0)}
                  {user?.last_name.charAt(0)}
                </Avatar>
                <Typography
                  sx={{ alignSelf: "center", ml: 1, display: "flex" }}
                >
                  {user?.first_name} <br />
                  {user?.last_name} <br />
                  {user?.email} <br />
                  {user?.country || "NO COUNTRY"}
                </Typography>
                <Tooltip
                  title="User No."
                  placement="bottom"
                  arrow
                  sx={{ ml: 1 }}
                >
                  <Chip
                    label={`#${user?.id}`}
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
                {!user?.priority_category_1 &&
                  !user?.priority_category_2 &&
                  !user?.priority_category_3 &&
                  "None"}{" "}
              </Typography>
              {user?.priority_category_1 && (
                <Chip
                  label={user.priority_category_1}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              {user?.priority_category_2 && (
                <Chip
                  label={user.priority_category_2}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              {user?.priority_category_3 && (
                <Chip
                  label={user.priority_category_3}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}

              <br />
              <br />
              <Typography component="p">{displayBio(user?.bio)}</Typography>
            </Box>

            <Box
              width="50%"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={`/flags/${
                  countryShorthands[
                    user?.country as keyof typeof countryShorthands
                  ]
                }.svg`}
                width={150}
                height={150}
              />
            </Box>
          </Box>
          <Stack
            spacing={1}
            direction="row"
          >
            <Button
              endIcon={<SettingsIcon />}
              onClick={() => navigate("/settings")}
            >
              settings
            </Button>
            <Button
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              logout
            </Button>
          </Stack>
        </>
      )}
    </Box>
  )
}

export default Profile
