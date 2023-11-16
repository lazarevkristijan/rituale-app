import "./Login.css"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../features/session/sessionSlice"

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
      <form>
        <div>
          <TextField
            label="Email"
            autoFocus
            sx={{ mb: 1 }}
          />
        </div>
        <div>
          <TextField
            label="Password"
            sx={{ mb: 3 }}
          />
        </div>

        <Button
          sx={{ mr: 1 }}
          onClick={() => {
            dispatch(login())
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
