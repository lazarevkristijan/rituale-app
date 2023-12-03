import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import { changeColorTheme } from "../features/settings/settingsSlice"
import axios from "axios"

const Settings = () => {
  const dispatch = useDispatch()
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  const handleThemeChange = () => {
    axios
      .patch(
        "http://localhost:5432/user-settings/change-theme",
        JSON.stringify({ theme: colorTheme === "dark" ? "light" : "dark" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(changeColorTheme(response.data.theme))
      })
  }

  return (
    <Box>
      <Box maxWidth="fit-content">
        <FormGroup>
          <FormControlLabel
            control={<Switch />}
            checked={colorTheme === "dark"}
            label="Dark Mode"
            labelPlacement="start"
            onChange={handleThemeChange}
          />
        </FormGroup>
      </Box>
    </Box>
  )
}

export default Settings
