import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { RootState } from "../../Store"
import { handleCountryChange } from "../../Utils/SettingsUtils"
import { allCountries } from "../../constants"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const CountrySelect = () => {
  const dispatch = useDispatch()
  const [isUpdating, setIsUpdating] = useState(false)
  const user = useSelector((state: RootState) => state.session.user)

  return (
    <Box
      sx={{ mb: 2 }}
      component="section"
    >
      <Typography variant="h3">Country</Typography>
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
