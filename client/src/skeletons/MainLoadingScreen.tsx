import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const MainLoadingScreen = () => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        component="img"
        src={`/logo-text${colorTheme === "dark" ? "" : "-w"}.svg`}
        width={300}
        height={100}
      />
      <Typography>Loading...</Typography>
    </Box>
  )
}

export default MainLoadingScreen
