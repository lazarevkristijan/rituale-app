import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import { changeTheme } from "../features/theme/themeSlice"

const Settings = () => {
  const DarkTheme = useSelector((state: RootState) => state.theme.value)
  const dispatch = useDispatch()

  return (
    <Box>
      <Box maxWidth="fit-content">
        <FormGroup>
          <FormControlLabel
            control={<Switch />}
            checked={DarkTheme}
            onChange={() => dispatch(changeTheme())}
            label="Dark Mode"
            labelPlacement="start"
          />
        </FormGroup>
      </Box>
    </Box>
  )
}

export default Settings
