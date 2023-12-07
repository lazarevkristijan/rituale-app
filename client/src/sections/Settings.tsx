import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import {
  changeColorTheme,
  changeLanguage,
} from "../features/settings/settingsSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { login, logout } from "../features/session/sessionSlice"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import { useState } from "react"
import { emailRegex, nameRegex } from "../Regex"

const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )
  const language = useSelector((state: RootState) => state.settings.language)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleThemeChange = () => {
    axios
      .patch(
        "http://localhost:5432/user-settings/change-theme",
        JSON.stringify({ theme: colorTheme === "dark" ? "light" : "dark" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(changeColorTheme(response.data.theme))
      })
  }

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:5432/delete-user/${user?.id}`, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logout())
        dispatch(clearHabits())
        navigate("/login")
      })
  }

  const [userData, setUserData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const handleUserDataChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios
      .patch(
        `http://localhost:5432/change-user-data/${user?.id}`,
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("res data", response.data)
        dispatch(login({ ...user, ...response.data }))
      })
  }

  const handleLanguageChange = () => {
    axios.patch("")
  }

  return (
    <Box>
      <Typography
        component="h2"
        sx={{ fontSize: 50 }}
      >
        {user?.first_name}'s settings
      </Typography>
      <form onSubmit={(e) => handleUserDataChange(e)}>
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
                const capitalizedFirstName =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1).toLowerCase()

                setUserData({ ...userData, firstName: capitalizedFirstName })
              }}
              error={!nameRegex.test(userData.firstName)}
            />
            <TextField
              label="Last Name"
              sx={{ mb: 1 }}
              value={userData.lastName}
              onChange={(e) => {
                const capitalizedLastName =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1).toLowerCase()

                setUserData({ ...userData, lastName: capitalizedLastName })
              }}
              error={!nameRegex.test(userData.lastName)}
            />
          </Box>
          <TextField
            label="email"
            type="email"
            sx={{ mb: 1 }}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            error={!emailRegex.test(userData.email)}
          />
          <TextField
            label="Old password"
            value={userData.oldPassword}
            onChange={(e) =>
              setUserData({ ...userData, oldPassword: e.target.value })
            }
            helperText="Must be at least 8 characters long, have 1 lowercase, 1 uppercase letter and 1 number"
          />
          <TextField
            label="New password"
            value={userData.newPassword}
            onChange={(e) =>
              setUserData({ ...userData, newPassword: e.target.value })
            }
          />
          <TextField
            label="Confirm new password"
            value={userData.confirmNewPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmNewPassword: e.target.value })
            }
          />
        </Box>
        <Button type="submit">save changes</Button>
      </form>
      <br />
      <br />

      <Button onClick={() => setIsDialogOpen(true)}>change language</Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="langauge dialog"
      >
        <DialogTitle>Change Language</DialogTitle>
        <DialogContent>
          <List>
            <ListItemButton selected={language === "en"}>
              <ListItemText primary="English" />
            </ListItemButton>
            <Divider />
            <ListItemButton
              selected={language === "es"}
              onClick={() => dispatch(changeLanguage("es"))}
            >
              <ListItemText primary="Spanish" />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary="German" />
            </ListItemButton>
            <Divider />

            <ListItemButton>
              <ListItemText primary="Italian" />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary="French" />
            </ListItemButton>
          </List>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <FormGroup sx={{ display: "block" }}>
        <FormControlLabel
          control={<Switch />}
          checked={colorTheme === "dark"}
          label="Dark Mode"
          labelPlacement="start"
          onChange={handleThemeChange}
        />
      </FormGroup>
      <Typography
        component="h3"
        sx={{ color: "red", fontWeight: "bold", fontSize: 35 }}
      >
        Danger Zone
      </Typography>
      <Button onDoubleClick={handleDeleteUser}>delete profile</Button>
    </Box>
  )
}

export default Settings
