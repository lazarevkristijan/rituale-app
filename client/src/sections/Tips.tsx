import { Box } from "@mui/material"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useDispatch } from "react-redux"

const Tips = () => {
  const dispatch = useDispatch()
  dispatch(changeLocation(3))

  return (
    <Box>
      <Box>
        <h1>Tips</h1>
      </Box>
    </Box>
  )
}

export default Tips
