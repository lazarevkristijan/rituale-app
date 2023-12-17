import { Box, Typography } from "@mui/material"

const MainLoadingScreen = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        component="img"
        src="/logo-text.svg"
        width={300}
        height={100}
      />
      <Typography>Loading...</Typography>
    </Box>
  )
}

export default MainLoadingScreen
