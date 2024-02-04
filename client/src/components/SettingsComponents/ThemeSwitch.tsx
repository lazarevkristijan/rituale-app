import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material"
import { AppDispatch } from "../../Store"
import { handleThemeChange } from "../../Utils/SettingsUtils"
import { useState } from "react"

const ThemeSwitch = ({
  dispatch,
  colorTheme,
}: {
  dispatch: AppDispatch
  colorTheme: string
}) => {
  const [isUpdating, setIsUpdating] = useState(false)
  return (
    <Box sx={{ mb: 2 }}>
      <Typography>Theme change</Typography>
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
