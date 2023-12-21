import { Box, Button, Stack, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useNavigate } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import LoginIcon from "@mui/icons-material/Login"
import PersonIcon from "@mui/icons-material/Person"
const NotFound = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  dispatch(changeLocation(0))

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{ mt: 5, mb: 3 }}
        variant="h3"
      >
        Ooops.. Page not found
      </Typography>

      <Stack gap={2}>
        <Button
          onClick={() => navigate("/")}
          startIcon={<HomeIcon />}
        >
          return home?
        </Button>

        <Button
          onClick={() => navigate("/login")}
          startIcon={<LoginIcon />}
        >
          to login?
        </Button>

        <Button
          onClick={() => navigate("/profile")}
          startIcon={<PersonIcon />}
        >
          to profile?
        </Button>
      </Stack>
    </Box>
  )
}

export default NotFound
