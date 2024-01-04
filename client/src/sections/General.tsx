import { Box, Typography } from "@mui/material"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useDispatch } from "react-redux"
import GeneralTabs from "../components/GeneralTabs"
import { useEffect } from "react"

const General = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeLocation(3))
  }, [dispatch])

  return (
    <Box>
      <Typography variant="h2">General</Typography>

      <Box width="100%">
        <GeneralTabs />
      </Box>
    </Box>
  )
}

export default General
