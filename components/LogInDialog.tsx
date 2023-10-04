import { Container, Dialog, TextField, Typography } from "@mui/material"
import { useContext } from "react"
import { LogInMenu } from "../sections/Hero"

const LogInDialog = () => {
  const { isLoginDialogOpen } = useContext(LogInMenu)

  return (
    <Dialog open={isLoginDialogOpen}>
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
