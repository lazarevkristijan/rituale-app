import { Box, Typography } from "@mui/material"
import React from "react"

const CookieAcceptPopup = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 20,
        bottom: 60,
        width: 300,
        height: 200,
        bgcolor: "white",
        color: "black",
        borderRadius: 2,
        border: "3px solid red",
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography>
        We use only essential cookies, by using our website, you accept cookies
        for authentication, security, theme and images
      </Typography>
      {children}
    </Box>
  )
}

export default CookieAcceptPopup
