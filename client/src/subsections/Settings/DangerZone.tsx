import { Button, CircularProgress, Typography } from "@mui/material"
import { useState } from "react"
import DeletUserDialog from "../../components/SettingsComponents/DeletUserDialog"

const DangerZone = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Typography
        component="h3"
        sx={{ color: "red", fontWeight: "bold", fontSize: 35 }}
      >
        Danger Zone
      </Typography>
      <Button onClick={() => setIsDialogOpen(true)}>delete account</Button>
      {isDeleting && <CircularProgress size={15} />}
      <DeletUserDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setIsDeleting={setIsDeleting}
      />
    </>
  )
}

export default DangerZone
