import { Box, Button, Stack, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useNavigate } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import LoginIcon from "@mui/icons-material/Login"
import PersonIcon from "@mui/icons-material/Person"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

const NotFound = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(changeNavbarLocation(0))
  }, [dispatch])

  const { loginWithRedirect: auth0login, isAuthenticated: auth0authenticated } =
    useAuth0()

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{ mt: 5, mb: 3 }}
        variant="h2"
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

        {auth0authenticated ? (
          <Button
            onClick={() => navigate("/profile")}
            startIcon={<PersonIcon />}
          >
            to profile?
          </Button>
        ) : (
          <Button
            onClick={() => auth0login()}
            startIcon={<LoginIcon />}
          >
            to login?
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default NotFound
