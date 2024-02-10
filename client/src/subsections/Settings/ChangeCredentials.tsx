import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material"
import {
  checkUsernameAvail,
  handleUserDataChange,
} from "../../Utils/SettingsUtils"
import { useState } from "react"
import { nameRegex, usernameRegex } from "../../Regex"
import SaveIcon from "@mui/icons-material/Save"
import { RootState } from "../../Store"
import { useDispatch, useSelector } from "react-redux"

const ChangeCredentials = () => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

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

  const [isUpdating, setIsUpdating] = useState(false)

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)

  if (!user) return

  return (
    <Box component="section">
      <form
        onSubmit={(e) =>
          handleUserDataChange(e, userData, dispatch, user, setIsUpdating)
        }
      >
        <Typography
          sx={{ mb: 1 }}
          variant="h3"
        >
          Change credentials
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexDirection: "row" }}>
            <TextField
              autoComplete="off"
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
              helperText={
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: !nameRegex.test(userData.firstName) ? "red" : "",
                    textAlign: "center",
                  }}
                >
                  Max 50 characters,
                  <br />
                  uppercase and lowercase
                </Typography>
              }
            />
            <TextField
              autoComplete="off"
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
              helperText={
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: !nameRegex.test(userData.lastName) ? "red" : "",
                    textAlign: "center",
                  }}
                >
                  Max 50 characters,
                  <br />
                  uppercase and lowercase
                </Typography>
              }
            />
            <TextField
              autoComplete="off"
              label="Username"
              value={userData.username}
              sx={{ mb: 1 }}
              onChange={(e) => {
                if (!changedFields.username) {
                  setChangedFields({ ...changedFields, username: true })
                }

                setUserData({ ...userData, username: e.target.value })
                if (
                  changedFields.username &&
                  e.target.value !== initialUserData.username &&
                  usernameRegex.test(userData.username)
                ) {
                  checkUsernameAvail(e.target.value).then((response) =>
                    response === 401
                      ? setIsUsernameAvailable(false)
                      : setIsUsernameAvailable(true)
                  )
                }
              }}
              error={
                ((userData.username.length < 2 ||
                  userData.username.length > 50) &&
                  changedFields.username) ||
                !usernameRegex.test(userData.username)
              }
              helperText={
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: !usernameRegex.test(userData.username) ? "red" : "",
                  }}
                >
                  Max 50 characters,
                  <br />
                  lowercase and numbers
                  {changedFields.username &&
                    userData.username !== initialUserData.username &&
                    usernameRegex.test(userData.username) &&
                    (isUsernameAvailable ? (
                      <Typography
                        component="span"
                        variant="caption"
                        color={colorTheme === "dark" ? "#3ffc6e" : "#00751d"}
                        fontWeight="700"
                      >
                        <br />
                        username available
                      </Typography>
                    ) : (
                      <Typography
                        component="span"
                        variant="caption"
                        color={colorTheme === "dark" ? "#ffb3b3" : "#fc3838"}
                        fontWeight="700"
                      >
                        <br />
                        username not available
                      </Typography>
                    ))}
                </Typography>
              }
            />
          </Box>
        </Box>
        <Button
          type="submit"
          disabled={
            !nameRegex.test(userData.firstName) ||
            !nameRegex.test(userData.lastName) ||
            !usernameRegex.test(userData.username) ||
            (nameRegex.test(userData.firstName) &&
              initialUserData.firstName === userData.firstName &&
              nameRegex.test(userData.lastName) &&
              initialUserData.lastName === userData.lastName &&
              usernameRegex.test(userData.username) &&
              initialUserData.username === userData.username) ||
            !isUsernameAvailable
          }
          startIcon={<SaveIcon />}
        >
          save
        </Button>
        {isUpdating && <CircularProgress size={15} />}
      </form>
    </Box>
  )
}

export default ChangeCredentials
