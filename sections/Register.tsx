import { Box, Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Register = () => {
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
      <TextField
        label="First Name"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Last Name"
        sx={{ mb: 1 }}
      />
      <TextField
        label="Email"
        sx={{ mb: 3 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => navigate("/login")}>login</Button>
        <Button onClick={() => navigate("/complete-registration")}>
          register
        </Button>
      </Box>
    </Box>
  )
}

export default Register
