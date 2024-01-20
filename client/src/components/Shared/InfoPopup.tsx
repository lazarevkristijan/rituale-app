import { Button, IconButton, Snackbar } from "@mui/material"
import React from "react"
import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"

const InfoPopup = ({
  duration,
  message,
}: {
  duration: number
  message: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return

    setIsOpen(false)
  }

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={handleClose}
      >
        undo
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1000 * duration}
      onClose={handleClose}
      message={message}
      action={action}
    />
  )
}

export default InfoPopup
