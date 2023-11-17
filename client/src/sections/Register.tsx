import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "https://api.rituale.digital/register",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log("Resposne from the server: ", response.data)
    } catch (error) {
      console.error("Error during POST request on registration:: ", error)
    }
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          sx={{ mb: 1 }}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
        <TextField
          label="Last Name"
          sx={{ mb: 1 }}
          required
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <TextField
          type="email"
          label="Email"
          sx={{ mb: 1 }}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          type="password"
          label="Password"
          sx={{ mb: 3 }}
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Box>
          <Button onClick={() => navigate("/login")}>login</Button>
          <Button
            type="submit"
            disabled={
              !formData.firstName ||
              !formData.lastName ||
              !emailRegex.test(formData.email) ||
              !passwordRegex.test(formData.password)
            }
          >
            register
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Register
