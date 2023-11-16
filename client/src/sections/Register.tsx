import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState({
    value: "",
    touched: false,
    error: false,
  })
  const [lastName, setLastName] = useState({
    value: "",
    touched: false,
    error: false,
  })
  const [email, setEmail] = useState({
    value: "",
    touched: false,
    error: false,
  })
  const [password, setPassword] = useState({
    value: "",
    touched: false,
    error: false,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "https://api.rituale.digital/register",
        { firstName, lastName, email, password }
      )

      if (response.status === 200) {
        console.log("Registration successful")
        navigate("/login")
      } else {
        console.error("Registration failed")
      }
    } catch (error) {
      console.error("Error: ", error)
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
          onChange={(e) =>
            setFirstName({ ...firstName, value: e.target.value })
          }
          required
          onBlur={() =>
            !firstName.value
              ? setFirstName({ ...firstName, error: true })
              : setFirstName({ ...firstName, error: false })
          }
          error={firstName.error}
        />
        <TextField
          label="Last Name"
          sx={{ mb: 1 }}
          required
          onChange={(e) => setLastName({ ...lastName, value: e.target.value })}
          onBlur={() =>
            !lastName.value
              ? setLastName({ ...lastName, error: true })
              : setLastName({ ...lastName, error: false })
          }
          error={lastName.error}
        />
        <TextField
          type="email"
          label="Email"
          sx={{ mb: 1 }}
          required
          onChange={(e) => setEmail({ ...email, value: e.target.value })}
          onBlur={() =>
            !email.value
              ? setEmail({ ...email, error: true })
              : setEmail({ ...email, error: false })
          }
          error={email.error}
        />
        <TextField
          type="password"
          label="Password"
          sx={{ mb: 3 }}
          required
          onChange={(e) => setPassword({ ...password, value: e.target.value })}
          onBlur={() =>
            !password.value
              ? setPassword({ ...password, error: true })
              : setPassword({ ...password, error: false })
          }
          error={password.error}
        />
      </form>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => navigate("/login")}>login</Button>
        <Button
          type="submit"
          disabled={
            firstName.error || lastName.error || email.error || password.error
          }
        >
          register
        </Button>
      </Box>
    </Box>
  )
}

export default Register
