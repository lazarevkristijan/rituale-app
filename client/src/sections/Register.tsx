import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { emailRegex, nameRegex, passwordRegex, profanityRegex } from "../Regex"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/session/sessionSlice"
import { RootState } from "../Store"
import AccountCircle from "@mui/icons-material/AccountCircle"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import HttpsIcon from "@mui/icons-material/Https"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(changeLocation(1))

  const user = useSelector((state: RootState) => state.session.user)
  useEffect(() => {
    user ? navigate("/profile") : setIsLoading(false)
  }, [navigate, user])

  const [isLoading, setIsLoading] = useState(true)

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

    if (
      profanityRegex.test(formData.firstName) ||
      profanityRegex.test(formData.lastName) ||
      profanityRegex.test(formData.email)
    ) {
      return console.error("profanity word")
    }
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
      {isLoading ? (
        <Typography component="h1">Loading...</Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            sx={{ mb: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    color={
                      !nameRegex.test(formData.firstName) &&
                      touchedFields.firstName
                        ? "error"
                        : !nameRegex.test(formData.firstName) &&
                          !touchedFields.firstName
                        ? "primary"
                        : "success"
                    }
                  />
                </InputAdornment>
              ),
            }}
            value={formData.firstName}
            onChange={(e) => {
              const capitalizedFirstName =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1).toLowerCase()

              setFormData({ ...formData, firstName: capitalizedFirstName })
            }}
            error={
              !nameRegex.test(formData.firstName) && touchedFields.firstName
            }
            onBlur={() =>
              setTouchedFields({ ...touchedFields, firstName: true })
            }
            required
          />
          <TextField
            label="Last Name"
            sx={{ mb: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    color={
                      !nameRegex.test(formData.lastName) &&
                      touchedFields.lastName
                        ? "error"
                        : !nameRegex.test(formData.lastName) &&
                          !touchedFields.lastName
                        ? "primary"
                        : "success"
                    }
                  />
                </InputAdornment>
              ),
            }}
            value={formData.lastName}
            onChange={(e) => {
              const capitalizedLastName =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1).toLowerCase()
              setFormData({ ...formData, lastName: capitalizedLastName })
            }}
            error={!nameRegex.test(formData.lastName) && touchedFields.lastName}
            onBlur={() =>
              setTouchedFields({ ...touchedFields, lastName: true })
            }
            required
          />
          <TextField
            type="email"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon
                    color={
                      !emailRegex.test(formData.email) && touchedFields.email
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
            value={formData.email}
            sx={{ mb: 1 }}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={!emailRegex.test(formData.email) && touchedFields.email}
            onBlur={() => setTouchedFields({ ...touchedFields, email: true })}
            required
          />
          <TextField
            type="password"
            label="Password"
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
            sx={{ mb: 3 }}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={
              !passwordRegex.test(formData.password) && touchedFields.password
            }
            onBlur={() =>
              setTouchedFields({ ...touchedFields, password: true })
            }
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
      )}
    </Box>
  )
}

export default Register
