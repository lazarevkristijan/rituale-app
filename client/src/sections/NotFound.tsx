import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"

const NotFound = () => {
  const dispatch = useDispatch()
  dispatch(changeLocation(0))

  return <Box>NotFound</Box>
}

export default NotFound
