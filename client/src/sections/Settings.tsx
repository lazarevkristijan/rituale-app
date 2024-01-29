import { Box } from "@mui/material"
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
import CountrySelect from "../subsections/Settings/CountrySelect"
import ChangeCredentials from "../subsections/Settings/ChangeCredentials"
import DangerZone from "../subsections/Settings/DangerZone"
import Top from "../subsections/Settings/Top"

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
      <Top user={user} />
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
        colorTheme={colorTheme}
      />
      <br />
      <DangerZone />
      <br />

      <SettingsLegalInfo />
    </Box>
  )
}

export default Settings
