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

  if (!user) return

  return (
    <Box component="section">
      <Top />

      <ProfilePicture />

      <Bio />

      <FocusedCategories />

      <ThemeSwitch />

      <CountrySelect />

      <ChangeCredentials />

      <DangerZone />
    </Box>
  )
}

export default Settings
