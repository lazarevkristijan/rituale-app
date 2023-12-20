import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  dispatch(changeLocation(4))

  return <Box>ForgotPassword</Box>
}

export default ForgotPassword
