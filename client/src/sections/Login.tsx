import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/session/sessionSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { emailRegex, passwordRegex } from "../Regex"
import { RootState } from "../Store"
import { UserSettingsTypes } from "../Types"
import {
  changeColorTheme,
  changeLanguage,
} from "../features/settings/settingsSlice"

const Login = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)
  useEffect(() => {
    user ? navigate("/profile") : setIsLoading(false)
  }, [navigate, user])

  const dispatch = useDispatch()
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
          .get(`http://localhost:5432/user-settings/${response.data.id}`)
          .then((response) => {
            const colorTheme = response.data.filter(
              (setting: UserSettingsTypes) => setting.setting_id === 1
            )
            const language = response.data.filter(
              (setting: UserSettingsTypes) => setting.setting_id === 2
            )
            dispatch(changeColorTheme(colorTheme[0].value))
            dispatch(changeLanguage(language[0].value))
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
              autoFocus
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!emailRegex.test(formData.email) && touchedFields.email}
              onBlur={() => setTouchedFields({ ...touchedFields, email: true })}
              sx={{ mb: 1 }}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={
                !passwordRegex.test(formData.password) && touchedFields.password
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
    </Box>
  )
}

export default Login
