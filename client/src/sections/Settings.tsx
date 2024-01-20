import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import { nameRegex, usernameRegex } from "../Regex"
import SaveIcon from "@mui/icons-material/Save"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { handleUserDataChange, handleUserDelete } from "../Utils/SettingsUtils"
import SettingsLegalInfo from "../subsections/Settings/SettingsLegalInfo"
import ProfilePicture from "../subsections/Settings/ProfilePicture"
import Bio from "../subsections/Settings/Bio"
import FocusedCategories from "../subsections/Settings/FocusedCategories"
import ThemeSwitch from "../components/SettingsComponents/ThemeSwitch"
import CountrySelect from "../components/SettingsComponents/CountrySelect"

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

  const [userData, setUserData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    username: user?.username || "",
  })

  const initialUserData = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    username: user?.username || "",
  }

  const [changedFields, setChangedFields] = useState({
    firstName: false,
    lastName: false,
    username: false,
  })

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
      <ProfilePicture />
      <br />
      <Bio />
      <br />
      <FocusedCategories />
      <br />
      <ThemeSwitch />
      <br />
      <CountrySelect />
      <br />

      <form onSubmit={(e) => handleUserDataChange(e, userData, dispatch, user)}>
        <Typography
          component="h3"
          sx={{ fontSize: 35 }}
        >
          Change credentials
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexDirection: "row" }}>
            <TextField
              label="First Name"
              sx={{ mb: 1 }}
              value={userData.firstName}
              onChange={(e) => {
                if (!changedFields.firstName) {
                  setChangedFields({ ...changedFields, firstName: true })
                }
                const capitalizedFirstName =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1).toLowerCase()

                setUserData({ ...userData, firstName: capitalizedFirstName })
              }}
              error={
                !nameRegex.test(userData.firstName) && changedFields.firstName
              }
            />
            <TextField
              label="Last Name"
              value={userData.lastName}
              sx={{ mb: 1 }}
              onChange={(e) => {
                if (!changedFields.lastName) {
                  setChangedFields({ ...changedFields, lastName: true })
                }
                const capitalizedLastName =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1).toLowerCase()

                setUserData({ ...userData, lastName: capitalizedLastName })
              }}
              error={
                !nameRegex.test(userData.lastName) && changedFields.lastName
              }
            />
            <TextField
              label="Username"
              value={userData.username}
              sx={{ mb: 1 }}
              onChange={(e) => {
                if (!changedFields.username) {
                  setChangedFields({ ...changedFields, username: true })
                }
                setUserData({ ...userData, username: e.target.value })
              }}
              error={
                (userData.username.length < 2 ||
                  userData.username.length > 50) &&
                changedFields.username
              }
              helperText="Limit 1 - 50 characters"
            />
          </Box>
        </Box>
        <Button
          type="submit"
          disabled={
            (!nameRegex.test(userData.firstName) ||
              userData.firstName === initialUserData.firstName) &&
            (!nameRegex.test(userData.lastName) ||
              userData.lastName === initialUserData.lastName) &&
            (!usernameRegex.test(userData.username) ||
              userData.username === initialUserData.username)
          }
          startIcon={<SaveIcon />}
        >
          save changes
        </Button>
      </form>
      <br />
      <br />

      <Typography
        component="h3"
        sx={{ color: "red", fontWeight: "bold", fontSize: 35 }}
      >
        Danger Zone
      </Typography>
      <Button
        onDoubleClick={() =>
          handleUserDelete(user?.profile_picture, dispatch, auth0logout)
        }
      >
        delete profile
      </Button>
      <SettingsLegalInfo />
    </Box>
  )
}

export default Settings
