import { Box, Button, Stack, Typography } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { ProfileSkeleton } from "../skeletons"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { handleLogout } from "../Utils/ProfileUtils"
import ProfileMainPart from "../subsections/Shared/ProfileMainPart"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeNavbarLocation(4))
  }, [dispatch])

  const {
    logout: auth0logout,
    isAuthenticated: auth0authenticated,
    isLoading: auth0loading,
  } = useAuth0()
  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  const user = useSelector((state: RootState) => state.session.user)

  if (!user) return

  return (
    <Box>
      {auth0loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Typography variant="h3">{user.username}'s Profile</Typography>
          <ProfileMainPart user={user} />

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
              onClick={() => handleLogout(dispatch, auth0logout)}
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
