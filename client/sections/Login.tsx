import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../src/features/session/sessionSlice"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

      <TextField
        label="Email"
        autoFocus
        sx={{ mb: 1 }}
      />
      <TextField
        label="Password"
        sx={{ mb: 3 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            sx={{ mr: 1 }}
            onClick={() => {
              dispatch(login())
              navigate("/")
            }}
          >
            login
          </Button>
          <Button onClick={() => navigate("/forgot-password")}>
            forgot password?
          </Button>
        </Box>
        <Button onClick={() => navigate("/register")}>register</Button>
      </Box>
    </Box>
  )
}

export default Login
