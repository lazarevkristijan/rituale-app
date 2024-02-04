import { Box } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import {
  Bio,
  FocusedCategories,
  CountrySelect,
  ChangeCredentials,
  DangerZone,
  Top,
  ProfilePicture,
} from "../subsections/Settings"
import { ThemeSwitch } from "../components/SettingsComponents"

const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(changeNavbarLocation(4))
  }, [dispatch])

  const { isAuthenticated: auth0authenticated } = useAuth0()

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
      <Top />

      <ProfilePicture
        dispatch={dispatch}
        user={user}
      />

      <Bio
        dispatch={dispatch}
        user={user}
      />

      <FocusedCategories user={user} />

      <ThemeSwitch
        dispatch={dispatch}
        colorTheme={colorTheme}
      />

      <CountrySelect
        user={user}
        dispatch={dispatch}
      />

      <ChangeCredentials
        user={user}
        dispatch={dispatch}
        colorTheme={colorTheme}
      />

      <DangerZone />
    </Box>
  )
}

export default Settings
