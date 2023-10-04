import { Container, Dialog, TextField, Typography } from "@mui/material"
import { useContext } from "react"
import { LogInMenu } from "../sections/Hero"

const LogInDialog = () => {
  const { isLoginDialogOpen, handleOpenLoginMenu } = useContext(LogInMenu)

  return (
    <Dialog
      open={isLoginDialogOpen}
      onClose={handleOpenLoginMenu}
    >
      <Container>
        <Typography fontSize={25}>Productivity time!</Typography>
        <TextField
          variant="outlined"
          label="asd"
        />
      </Container>
    </Dialog>
  )
}

export default LogInDialog
