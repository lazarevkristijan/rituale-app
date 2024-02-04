import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
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
    <Box sx={{ mb: 2 }}>
      <Typography>Country</Typography>
      <FormControl>
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
    </Box>
  )
}

export default CountrySelect
