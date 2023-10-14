import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import { deepPurple } from "@mui/material/colors"
import SettingsIcon from "@mui/icons-material/Settings"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../src/features/session/sessionSlice"
import LogoutIcon from "@mui/icons-material/Logout"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Box>
      <Typography variant="h3">My Profile</Typography>
      <Box
        sx={{
          bgcolor: "primary.light",
          borderRadius: 1,
          p: 1,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", mb: 2 }}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>KL</Avatar>
          <Typography sx={{ alignSelf: "center", ml: 1, display: "flex" }}>
            Kristijan Lazarev{" "}
          </Typography>
          <Tooltip
            title="Member No."
            placement="bottom"
            arrow
            sx={{ ml: 1 }}
          >
            <Chip
              label="#1"
              color="primary"
            />
          </Tooltip>
        </Box>
        <Typography>
          Good Habits: <Typography component="span">100</Typography>
          <Typography>
            Main Goals:{" "}
            <Typography component="span">
              <Chip
                label="Health"
                variant="filled"
                color="primary"
                sx={{ ml: 1 }}
              />
              <Chip
                label="Fitness"
                variant="filled"
                color="primary"
                sx={{ ml: 1 }}
              />
            </Typography>
          </Typography>
        </Typography>
      </Box>
      <Stack
        spacing={1}
        direction="row"
      >
        <Button
          variant="contained"
          endIcon={<SettingsIcon />}
          onClick={() => navigate("/settings")}
        >
          settings
        </Button>
        <Button
          variant="contained"
          endIcon={<LogoutIcon />}
          onClick={() => {
            dispatch(logout())
            navigate("/")
          }}
        >
          logout
        </Button>
      </Stack>
    </Box>
  )
}

export default Profile
