import { Button, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { handleLogout } from "../../Utils/ProfileUtils"
import { useDispatch } from "react-redux"

const ProfileAuthPart = ({ logout }: { logout: () => void }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Stack
      spacing={1}
      direction="row"
      sx={{ width: "fit-content", mx: "auto" }}
      component="section"
    >
      <Button
        endIcon={<SettingsIcon />}
        onClick={() => navigate("/settings")}
      >
        settings
      </Button>
      <Button
        endIcon={<LogoutIcon />}
        onClick={() => handleLogout(dispatch, logout)}
      >
        logout
      </Button>
    </Stack>
  )
}

export default ProfileAuthPart
