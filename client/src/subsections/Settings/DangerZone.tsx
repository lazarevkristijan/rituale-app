import { Button, CircularProgress, Typography } from "@mui/material"
import { handleUserDelete } from "../../Utils/SettingsUtils"
import { AppDispatch } from "../../Store"
import { UserTypes } from "../../Types"
import { useState } from "react"

const DangerZone = ({
  user,
  dispatch,
  auth0logout,
}: {
  user: UserTypes
  dispatch: AppDispatch
  auth0logout: () => void
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

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
          handleUserDelete(
            user?.profile_picture,
            dispatch,
            auth0logout,
            setIsDeleting
          )
        }
      >
        delete profile
      </Button>
      {isDeleting && <CircularProgress size={15} />}
    </>
  )
}

export default DangerZone
