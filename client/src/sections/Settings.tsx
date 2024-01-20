import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import SettingsLegalInfo from "../subsections/Settings/SettingsLegalInfo"
import ProfilePicture from "../subsections/Settings/ProfilePicture"
import Bio from "../subsections/Settings/Bio"
import FocusedCategories from "../subsections/Settings/FocusedCategories"
import ThemeSwitch from "../components/SettingsComponents/ThemeSwitch"
import CountrySelect from "../components/SettingsComponents/CountrySelect"
import ChangeCredentials from "../components/SettingsComponents/ChangeCredentials"
import DangerZone from "../components/SettingsComponents/DangerZone"

const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(changeNavbarLocation(4))
  }, [dispatch])

  const { logout: auth0logout, isAuthenticated: auth0authenticated } =
    useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  if (!user) return

  return (
    <Box>
      <Typography
        component="h2"
        sx={{ fontSize: 50 }}
      >
        {user?.username}'s settings
      </Typography>
      <Breadcrumbs separator=">">
        <Link
          href="/profile"
          underline="hover"
        >
          Profile
        </Link>
        <Typography>Settings</Typography>
      </Breadcrumbs>

      <Typography variant="caption">
        Settings that don't have a "SAVE CHANGES" button are auto saved
      </Typography>
      <br />
      <ProfilePicture
        dispatch={dispatch}
        user={user}
      />
      <br />
      <Bio
        dispatch={dispatch}
        user={user}
      />
      <br />
      <FocusedCategories user={user} />
      <br />
      <ThemeSwitch
        dispatch={dispatch}
        colorTheme={colorTheme}
      />
      <br />
      <CountrySelect
        user={user}
        dispatch={dispatch}
      />
      <br />
      <ChangeCredentials
        user={user}
        dispatch={dispatch}
      />
      <br />
      <DangerZone
        user={user}
        dispatch={dispatch}
        auth0logout={auth0logout}
      />
      <br />

      <SettingsLegalInfo />
    </Box>
  )
}

export default Settings
