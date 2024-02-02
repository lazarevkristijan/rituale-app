import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { handleUserDelete } from "../../Utils/SettingsUtils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import { useAuth0 } from "@auth0/auth0-react"

const DeleteUserDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  setIsDeleting,
}: {
  isDialogOpen: boolean
  setIsDialogOpen: (value: React.SetStateAction<boolean>) => void
  setIsDeleting: (value: React.SetStateAction<boolean>) => void
}) => {
  const dispatch = useDispatch()
  const { logout: auth0logout } = useAuth0()
  const user = useSelector((state: RootState) => state.session.user)

  return (
    <Box>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <DialogTitle>Confirm account deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your account? This cannot be undone!
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              handleUserDelete(
                user?.profile_picture,
                dispatch,
                auth0logout,
                setIsDeleting
              )
            }
          >
            delete account
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DeleteUserDialog
