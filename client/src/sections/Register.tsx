import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { emailRegex, nameRegex, passwordRegex } from "../Regex"

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
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

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })

      setTouchedFields({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      })

      console.log("Response from the server: ", response.data)
    } catch (error) {
      console.error("Error during POST request on registration:: ", error)
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
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          sx={{ mb: 1 }}
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
          error={!nameRegex.test(formData.firstName) && touchedFields.firstName}
          onBlur={() => setTouchedFields({ ...touchedFields, firstName: true })}
        />
        <TextField
          label="Last Name"
          sx={{ mb: 1 }}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
          error={!nameRegex.test(formData.lastName) && touchedFields.lastName}
          onBlur={() => setTouchedFields({ ...touchedFields, lastName: true })}
        />
        <TextField
          type="email"
          label="Email"
          sx={{ mb: 1 }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          error={!emailRegex.test(formData.email) && touchedFields.email}
          onBlur={() => setTouchedFields({ ...touchedFields, email: true })}
        />
        <TextField
          type="password"
          label="Password"
          sx={{ mb: 3 }}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          error={
            !passwordRegex.test(formData.password) && touchedFields.password
          }
          onBlur={() => setTouchedFields({ ...touchedFields, password: true })}
        />
        <Box>
          <Button onClick={() => navigate("/login")}>login</Button>
          <Button
            type="submit"
            disabled={
              !nameRegex.test(formData.firstName) ||
              !nameRegex.test(formData.lastName) ||
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
