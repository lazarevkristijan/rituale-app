import { FormControlLabel, FormGroup, Switch } from "@mui/material"
import { AppDispatch } from "../../Store"
import { handleThemeChange } from "../../Utils/SettingsUtils"

const ThemeSwitch = ({
  dispatch,
  colorTheme,
}: {
  dispatch: AppDispatch
  colorTheme: string
}) => {
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
