import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
const Login = () => {
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
        <Button
          variant="contained"
          onClick={() => navigate("/forgot-password")}
        >
          forgot password?
        </Button>
        <Typography sx={{ alignSelf: "center" }}>OR</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/register")}
        >
          register
        </Button>
      </Box>
    </Box>
  )
}

export default Login
