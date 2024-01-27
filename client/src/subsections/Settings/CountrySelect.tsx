import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { AppDispatch } from "../../Store"
import { handleCountryChange } from "../../Utils/SettingsUtils"
import { allCountries, countryShorthands } from "../../constants"
import { UserTypes } from "../../Types"

const CountrySelect = ({
  user,
  dispatch,
}: {
  user: UserTypes
  dispatch: AppDispatch
}) => {
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
