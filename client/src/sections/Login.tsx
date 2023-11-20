import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/session/sessionSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { emailRegex, passwordRegex } from "../Regex"
import { RootState } from "../Store"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.session.user)

  useEffect(() => {
    if (user) {
      navigate("/profile")
    }
  }, [user, navigate])

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "https://api.rituale.digital/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const userData = response.data

      dispatch(login(userData))
    } catch (error) {
      setFormData({
        email: "",
        password: "",
      })
      setTouchedFields({
        email: false,
        password: false,
      })

      console.log("Error when logging in: ", error)
    }
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
      <Typography
        variant="h3"
        sx={{ textAlign: "center", mb: 2 }}
      >
        LOGIN
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          autoFocus
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          onBlur={() => setTouchedFields({ ...touchedFields, password: true })}
          sx={{ mb: 3 }}
          required
        />

        <Button
          sx={{ mr: 1 }}
          onClick={() => handleSubmit}
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
    </Box>
  )
}

export default Login
