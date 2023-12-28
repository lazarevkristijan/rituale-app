import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/session/sessionSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { emailRegex, passwordRegex } from "../Regex"
import { RootState } from "../Store"
import { CompletedHabitTypes, UserSettingsTypes } from "../Types"
import {
  changeColorTheme,
  changeLanguage,
} from "../features/settings/settingsSlice"
import { addHabit } from "../features/completedHabits/completedHabitsSlice"
import AccountCircle from "@mui/icons-material/AccountCircle"
import HttpsIcon from "@mui/icons-material/Https"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(changeLocation(4))
  const {
    loginWithRedirect,
    logout,
    user: auth0User,
    isAuthenticated,
    isLoading: isAuth0Loading,
  } = useAuth0()

  const user = useSelector((state: RootState) => state.session.user)
  useEffect(() => {
    user ? navigate("/profile") : setIsLoading(false)
  }, [navigate, user])

  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await axios
      .post("http://localhost:5432/login", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(login(response.data))
        axios
          .get(`http://localhost:5432/user-settings`, { withCredentials: true })
          .then((innerResponse1) => {
            const colorTheme = innerResponse1.data.filter(
              (setting: UserSettingsTypes) => setting.setting_id === 1
            )
            const language = innerResponse1.data.filter(
              (setting: UserSettingsTypes) => setting.setting_id === 2
            )
            dispatch(changeColorTheme(colorTheme[0].value))
            dispatch(changeLanguage(language[0].value))
            document.body.style.backgroundColor =
              colorTheme[0].value === "dark" ? "#121212" : "#fff"
          })
        axios
          .get(`http://localhost:5432/completed-habits`, {
            withCredentials: true,
          })
          .then((innerResponse2) => {
            if (!innerResponse2.data.length) return

            const habitIds = innerResponse2.data.map(
              (habit: CompletedHabitTypes) => habit.habit_id
            )
            dispatch(addHabit(habitIds))
          })
        navigate("/profile")
      })
      .catch((err) => {
        setFormData({
          email: "",
          password: "",
        })
        setTouchedFields({
          email: false,
          password: false,
        })
        console.error("Error when logging in: ", err)
      })
  }

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {isAuth0Loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Button
            onClick={() => {
              loginWithRedirect()
            }}
          >
            login auth0
          </Button>
          <Button onClick={() => logout()}>logout auth0</Button>
          {isAuthenticated ? (
            <Box>
              <Box
                component="img"
                src={auth0User?.picture}
              />
              {auth0User?.email_verified}
              <Typography>{auth0User?.given_name}</Typography>
              <Typography>{auth0User?.family_name}</Typography>
            </Box>
          ) : (
            "Not authenticated"
          )}
          {isLoading ? (
            <Typography component="h1">Loading...</Typography>
          ) : (
            <>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", mb: 2 }}
              >
                LOGIN
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle
                          color={
                            !emailRegex.test(formData.email) &&
                            touchedFields.email
                              ? "error"
                              : !emailRegex.test(formData.email) &&
                                !touchedFields.email
                              ? "primary"
                              : "success"
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  autoFocus
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={
                    !emailRegex.test(formData.email) && touchedFields.email
                  }
                  onBlur={() =>
                    setTouchedFields({ ...touchedFields, email: true })
                  }
                  sx={{ mb: 1 }}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HttpsIcon
                          color={
                            !passwordRegex.test(formData.password) &&
                            touchedFields.password
                              ? "error"
                              : !passwordRegex.test(formData.password) &&
                                !touchedFields.password
                              ? "primary"
                              : "success"
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  error={
                    !passwordRegex.test(formData.password) &&
                    touchedFields.password
                  }
                  onBlur={() =>
                    setTouchedFields({ ...touchedFields, password: true })
                  }
                  sx={{ mb: 3 }}
                  required
                />

                <Button
                  sx={{ mr: 1 }}
                  type="submit"
                  disabled={
                    !emailRegex.test(formData.email) ||
                    !passwordRegex.test(formData.password)
                  }
                >
                  login
                </Button>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                    >
                      forgot password?
                    </Button>
                  </Box>
                  <Button
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    register
                  </Button>
                </Box>
              </form>
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default Login
