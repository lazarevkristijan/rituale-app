import { Box, Link, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"

const CookieAcceptPopup = ({ children }: { children: React.ReactNode }) => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  return (
    <Box
      sx={{
        position: "fixed",
        right: 20,
        bottom: 60,
        width: 300,
        height: 200,
        bgcolor: colorTheme === "dark" ? "#000" : "#fff",
        borderRadius: 2,
        border: "3px solid red",
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography>
        We use only essential cookies, by using our website, you accept cookies
        for authentication, security, theme and images
        <br />
        <Link
          href="https://www.termsfeed.com/live/67488f52-ba8a-4438-bd5d-f9fc93cbbae6"
          target="_blank"
          underline="hover"
        >
          Privacy Policy
        </Link>
        <br />
        <Link
          href="https://www.termsandconditionsgenerator.com/live.php?token=R3tNAWErbhtEm3XDOzzsmD8SX1H77NVR"
          target="_blank"
          underline="hover"
        >
          Terms and Conditions
        </Link>
      </Typography>
      {children}
    </Box>
  )
}

export default CookieAcceptPopup
