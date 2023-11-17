import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../features/session/sessionSlice"
import axios from "axios"
import { useState } from "react"
import { emailRegex, passwordRegex } from "../Regex"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post(
        "https://api.rituale.digital/login",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  })

  const user = {
    first_name: null,
    last_name: null,
    email: null,
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
          onClick={() => {
            dispatch(login(user))
            navigate("/")
          }}
          type="submit"
        >
          login
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button onClick={() => navigate("/forgot-password")}>
              forgot password?
            </Button>
          </Box>
          <Button onClick={() => navigate("/register")}>register</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Login
