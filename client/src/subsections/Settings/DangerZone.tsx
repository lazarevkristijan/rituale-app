import { Button, Typography } from "@mui/material"
import { handleUserDelete } from "../../Utils/SettingsUtils"
import { AppDispatch } from "../../Store"
import { UserTypes } from "../../Types"

const DangerZone = ({
  user,
  dispatch,
  auth0logout,
}: {
  user: UserTypes
  dispatch: AppDispatch
  auth0logout: () => void
}) => {
  return (
    <>
      <Typography
        component="h3"
        sx={{ color: "red", fontWeight: "bold", fontSize: 35 }}
      >
        Danger Zone
      </Typography>
      <Button
        onDoubleClick={() =>
          handleUserDelete(user?.profile_picture, dispatch, auth0logout)
        }
      >
        delete profile
      </Button>
    </>
  )
}

export default DangerZone
