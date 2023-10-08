import { Box, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField label="First Name" />
      <TextField
        label="Last Name"
        sx={{ mt: 1 }}
      />
      <TextField
        label="Email"
        sx={{ mt: 1 }}
      />
      <Typography>
        Already have an account?<Link to="/login"> Login</Link>
      </Typography>
    </Box>
  )
}

export default Register
