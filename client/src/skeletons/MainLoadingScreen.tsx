import { Box, Typography } from "@mui/material"

const MainLoadingScreen = () => {
  let themeCookieValue
  document.cookie.split(";").forEach((cookie) => {
    if (cookie.includes("theme")) {
      themeCookieValue = cookie.split("=")[1]
    }
  })

  return (
    <Box sx={{ textAlign: "center", mt: -1 }}>
      <Box
        component="img"
        src={`/logo-text${themeCookieValue === "dark" ? "-w" : ""}.svg`}
        width={300}
      />
      <Typography color={themeCookieValue === "dark" ? "#fff" : "#000"}>
        Loading...
      </Typography>
    </Box>
  )
}

export default MainLoadingScreen
