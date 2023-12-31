import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/session/sessionSlice"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import axios from "axios"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import {
  changeColorTheme,
  changeLanguage,
} from "../features/settings/settingsSlice"
import { countryShorthands, defaultPfpURL } from "../constants"
import { ProfileSkeleton } from "../components"
import { getPfpLink } from "../HelperFunctions/getPfpLink"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { displayBio } from "../HelperFunctions/displayBio"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(changeLocation(4))

  const {
    logout: auth0logout,
    loginWithPopup: auth0login,
    isAuthenticated: auth0authenticated,
    user: auth0user,
  } = useAuth0()

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits
  )

  console.log(auth0authenticated, auth0user)

  useEffect(() => {
    auth0authenticated ? setIsLoading(false) : auth0login()
  }, [auth0authenticated, auth0login])

  const [isLoading, setIsLoading] = useState(true)
  const handleLogout = async () => {
    dispatch(logout())
    dispatch(clearHabits())
    dispatch(changeColorTheme("light"))
    dispatch(changeLanguage("en"))
    document.body.style.backgroundColor = "#fff"
    auth0logout()
  }

  const getAllHabits = async () => {
    const res = await axios.get("http://localhost:5432/all-habits")
    return res.data
  }
  const { data: allHabits } = useQuery("get-all-habits", getAllHabits)

  return (
    <Box>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Typography variant="h3">{user?.username}'s Profile</Typography>
          <Box
            sx={{
              bgcolor: `primary.${colorTheme}`,
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
                    background: `url('${getPfpLink(
                      user?.profile_picture || defaultPfpURL
                    )}') no-repeat center/cover #fff`,
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                    border: `3px solid ${
                      colorTheme === "dark" ? "white" : "black"
                    }`,
                  }}
                ></Box>
                <Typography
                  sx={{ alignSelf: "center", ml: 1, display: "flex" }}
                >
                  {user?.first_name} <br />
                  {user?.last_name} <br />
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
                Good Habits:
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {completedHabits.habits.length}{" "}
                </Typography>
                out of{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {allHabits?.length}
                </Typography>
              </Typography>

              <Box
                sx={{
                  border: "2px solid black",
                  width: 200,
                  borderRadius: 2,
                  mb: 1,
                  p: 0.3,
                  bgcolor: "white",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <Box
                  sx={{
                    width: `${Math.round(
                      (completedHabits.habits.length / allHabits?.length) * 100
                    )}%`,
                    textAlign: "right",
                    bgcolor: "green",
                    borderRadius: 2,
                  }}
                >
                  {Math.round(
                    (completedHabits.habits.length / allHabits?.length) * 100
                  )}
                  %
                </Box>
              </Box>
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
              {user?.country && (
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
              )}
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
