import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { emailRegex, nameRegex, passwordRegex } from "../Regex"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/session/sessionSlice"
import { RootState } from "../Store"

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.session.user)
  useEffect(() => {
    console.log("user value login", user)
    user && navigate("/profile")
  }, [navigate, user])

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

    await axios
      .post("http://localhost:5432/register", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(login(response.data))
        navigate("/profile")
      })
      .catch((error) => {
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
        console.error("Error during POST request on registration: ", error)
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
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          sx={{ mb: 1 }}
          value={formData.firstName}
          onChange={(e) => {
            const capitalizedFirstName =
              e.target.value.charAt(0).toUpperCase() +
              e.target.value.slice(1).toLowerCase()

            setFormData({ ...formData, firstName: capitalizedFirstName })
          }}
          error={!nameRegex.test(formData.firstName) && touchedFields.firstName}
          onBlur={() => setTouchedFields({ ...touchedFields, firstName: true })}
          required
        />
        <TextField
          label="Last Name"
          sx={{ mb: 1 }}
          value={formData.lastName}
          onChange={(e) => {
            const capitalizedLastName =
              e.target.value.charAt(0).toUpperCase() +
              e.target.value.slice(1).toLowerCase()
            setFormData({ ...formData, lastName: capitalizedLastName })
          }}
          error={!nameRegex.test(formData.lastName) && touchedFields.lastName}
          onBlur={() => setTouchedFields({ ...touchedFields, lastName: true })}
          required
        />
        <TextField
          type="email"
          label="Email"
          value={formData.email}
          sx={{ mb: 1 }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={!emailRegex.test(formData.email) && touchedFields.email}
          onBlur={() => setTouchedFields({ ...touchedFields, email: true })}
          required
        />
        <TextField
          type="password"
          label="Password"
          value={formData.password}
          sx={{ mb: 3 }}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={
            !passwordRegex.test(formData.password) && touchedFields.password
          }
          onBlur={() => setTouchedFields({ ...touchedFields, password: true })}
          required
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
