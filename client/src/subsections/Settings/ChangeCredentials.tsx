import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material"
import { handleUserDataChange } from "../../Utils/SettingsUtils"
import { useState } from "react"
import { nameRegex, usernameRegex } from "../../Regex"
import SaveIcon from "@mui/icons-material/Save"
import { UserTypes } from "../../Types"
import { AppDispatch } from "../../Store"

const ChangeCredentials = ({
  user,
  dispatch,
}: {
  user: UserTypes
  dispatch: AppDispatch
}) => {
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

  if (!user) return

  return (
    <form
      onSubmit={(e) =>
        handleUserDataChange(e, userData, dispatch, user, setIsUpdating)
      }
    >
      <Typography
        component="h3"
        sx={{ fontSize: 35 }}
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
              <FormHelperText
                sx={{
                  color: !nameRegex.test(userData.firstName) ? "red" : "",
                  textAlign: "center",
                }}
              >
                Max 50 characters,
                <br />
                uppercase and lowercase
              </FormHelperText>
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
            error={!nameRegex.test(userData.lastName) && changedFields.lastName}
            helperText={
              <FormHelperText
                sx={{
                  color: !nameRegex.test(userData.lastName) ? "red" : "",
                  textAlign: "center",
                }}
              >
                Max 50 characters,
                <br />
                uppercase and lowercase
              </FormHelperText>
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
            }}
            error={
              ((userData.username.length < 2 ||
                userData.username.length > 50) &&
                changedFields.username) ||
              !usernameRegex.test(userData.username)
            }
            helperText={
              <FormHelperText
                sx={{
                  color: !usernameRegex.test(userData.username) ? "red" : "",
                  textAlign: "center",
                }}
              >
                Max 50 characters,
                <br />
                lowercase and numbers
              </FormHelperText>
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
            initialUserData.username === userData.username)
        }
        startIcon={<SaveIcon />}
      >
        save changes
      </Button>
      {isUpdating && <CircularProgress size={15} />}
    </form>
  )
}

export default ChangeCredentials
