import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import { AppDispatch } from "../../Store"
import { handleCountryChange } from "../../Utils/SettingsUtils"
import { allCountries } from "../../constants"
import { UserTypes } from "../../Types"
import { useState } from "react"

const CountrySelect = ({
  user,
  dispatch,
}: {
  user: UserTypes
  dispatch: AppDispatch
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={user?.country || ""}
          onChange={(e) => {
            handleCountryChange(e, dispatch, setIsUpdating)
          }}
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
        {isUpdating && <CircularProgress size={15} />}
      </FormControl>
    </>
  )
}

export default CountrySelect
