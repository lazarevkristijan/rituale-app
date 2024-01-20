import { FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import { handleThemeChange } from "../../Utils/SettingsUtils"

const ThemeSwitch = () => {
  const dispatch = useDispatch()
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  return (
    <FormGroup sx={{ display: "block" }}>
      <FormControlLabel
        control={<Switch />}
        checked={colorTheme === "dark"}
        label="Dark Mode"
        labelPlacement="start"
        onChange={() => handleThemeChange(colorTheme, dispatch)}
      />
    </FormGroup>
  )
}

export default ThemeSwitch
