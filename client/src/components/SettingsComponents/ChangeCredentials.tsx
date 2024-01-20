import { Box, Button, TextField, Typography } from "@mui/material"
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

  if (!user) return

  return (
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
            error={!nameRegex.test(userData.lastName) && changedFields.lastName}
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
              (userData.username.length < 2 || userData.username.length > 50) &&
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
  )
}

export default ChangeCredentials
