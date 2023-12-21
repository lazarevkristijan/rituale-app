import { Box, Typography } from "@mui/material"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useDispatch } from "react-redux"
import GeneralTabs from "../components/GeneralTabs"

const Tips = () => {
  const dispatch = useDispatch()
  dispatch(changeLocation(3))

  return (
    <Box>
      <Typography variant="h2">Tips & General</Typography>

      <Box width="100%">
        <GeneralTabs />
      </Box>
    </Box>
  )
}

export default Tips
