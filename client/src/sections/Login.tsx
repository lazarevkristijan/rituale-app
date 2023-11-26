import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../features/session/sessionSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { emailRegex, passwordRegex } from "../Regex"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserAuth = async () => {
      const isAuthenticated = await axios
        .get("http://localhost:5432/check-auth", { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            return true
          } else {
            return false
          }
        })
      if (isAuthenticated) {
        navigate("/profile")
      }
    }
    fetchUserAuth()
  }, [navigate])

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

    await axios
      .post("http://localhost:5432/login", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        const userData = response.data
        dispatch(login(userData))
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
