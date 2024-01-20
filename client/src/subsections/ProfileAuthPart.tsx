import { Button, Stack } from "@mui/material"
import { NavigateFunction } from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { handleLogout } from "../Utils/ProfileUtils"
import { AppDispatch } from "../Store"

type LocalComponentTypes = {
  navigate: NavigateFunction
  dispatch: AppDispatch
  auth0logout: () => void
}

const ProfileAuthPart = (props: LocalComponentTypes) => {
  return (
    <Stack
      spacing={1}
      direction="row"
    >
      <Button
        endIcon={<SettingsIcon />}
        onClick={() => props.navigate("/settings")}
      >
        settings
      </Button>
      <Button
        endIcon={<LogoutIcon />}
        onClick={() => handleLogout(props.dispatch, props.auth0logout)}
      >
        logout
      </Button>
    </Stack>
  )
}

export default ProfileAuthPart
