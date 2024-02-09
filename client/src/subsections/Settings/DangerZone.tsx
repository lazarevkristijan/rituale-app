import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useState } from "react"
import { DeleteUserDialog } from "../../components/SettingsComponents"

const DangerZone = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Box
      sx={{ mt: 5 }}
      component="section"
    >
      <Typography
        component="h3"
        sx={{ color: "red", fontWeight: "bold", fontSize: 35 }}
      >
        Danger zone
      </Typography>
      <Button onClick={() => setIsDialogOpen(true)}>delete account</Button>
      {isDeleting && <CircularProgress size={15} />}
      <DeleteUserDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setIsDeleting={setIsDeleting}
      />
    </Box>
  )
}

export default DangerZone
