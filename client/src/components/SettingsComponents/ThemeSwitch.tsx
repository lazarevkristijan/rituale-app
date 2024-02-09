import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material"
import { handleThemeChange } from "../../Utils/SettingsUtils"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"

const ThemeSwitch = () => {
  const dispatch = useDispatch()

  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  const [isUpdating, setIsUpdating] = useState(false)
  return (
    <Box
      sx={{ mb: 2 }}
      component="section"
    >
      <Typography variant="h3">Theme change</Typography>
      <FormGroup sx={{ display: "block" }}>
        <FormControlLabel
          control={<Switch />}
          checked={colorTheme === "dark"}
          label="Dark Mode"
          labelPlacement="start"
          onChange={() => {
            setIsUpdating(true)
            handleThemeChange(colorTheme, dispatch, setIsUpdating)
          }}
        />
        {isUpdating && <CircularProgress size={15} />}
      </FormGroup>
    </Box>
  )
}

export default ThemeSwitch
