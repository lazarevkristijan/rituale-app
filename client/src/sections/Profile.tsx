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

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits
  )
  useEffect(() => {
    !user ? navigate("/login") : setIsLoading(false)
  }, [navigate, user])

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const darkTheme = useSelector((state: RootState) => state.theme.value)

  const handleLogout = async () => {
    await axios
      .get("http://localhost:5432/logout", { withCredentials: true })
      .then(() => {
        dispatch(logout())
        dispatch(clearHabits())
        dispatch(changeColorTheme("light"))
        navigate("/")
      })
      .catch((err) => console.error("Error logging out: ", err))
  }

  return (
    <Box>
      {isLoading ? (
        <Typography component="h1">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h3">My Profile</Typography>
          <Box
            sx={{
              bgcolor: `primary.${darkTheme ? "dark" : "light"}`,
              borderRadius: 1,
              p: 1,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {user?.first_name.charAt(0)}
                {user?.last_name.charAt(0)}
              </Avatar>
              <Typography sx={{ alignSelf: "center", ml: 1, display: "flex" }}>
                {user?.first_name} <br />
                {user?.last_name} <br />
                {user?.email}
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
            <Typography>
              Main Goals:{" "}
              <Typography component="span">
                <Chip
                  label="Health"
                  color="primary"
                  sx={{ ml: 1 }}
                  component="span"
                />
                <Chip
                  label="Fitness"
                  color="primary"
                  sx={{ ml: 1 }}
                  component="span"
                />
              </Typography>
            </Typography>
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
