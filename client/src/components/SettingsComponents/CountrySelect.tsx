import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import { handleCountryChange } from "../../Utils/SettingsUtils"
import { allCountries, countryShorthands } from "../../constants"

const CountrySelect = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.session.user)

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={user?.country || ""}
          onChange={(e) => handleCountryChange(e, dispatch)}
        >
          <MenuItem value="">SELECT</MenuItem>
          {allCountries.map((country: string, index) => (
            <MenuItem
              key={index}
              value={country}
            >
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>
        Current country: {user?.country || "None"}{" "}
        {user?.country && (
          <Box
            component="img"
            src={`/flags/${
              countryShorthands[user?.country as keyof typeof countryShorthands]
            }.svg`}
            width={20}
            height={20}
            sx={{ verticalAlign: "middle" }}
          />
        )}
      </Typography>
    </>
  )
}

export default CountrySelect
