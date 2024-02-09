import { Box, Typography } from "@mui/material"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useDispatch } from "react-redux"
import { GeneralTabs } from "../components/GeneralComponents/"
import { useEffect } from "react"

const General = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeNavbarLocation(3))
  }, [dispatch])

  return (
    <Box component="section">
      <Typography variant="h2">General</Typography>

      <Box>
        <GeneralTabs />
      </Box>
    </Box>
  )
}

export default General
