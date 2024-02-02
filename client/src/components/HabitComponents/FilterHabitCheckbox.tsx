import { Checkbox, FormControlLabel } from "@mui/material"

export const FilterHabitCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) => {
  return (
    <FormControlLabel
      label={label}
      control={<Checkbox checked={checked} />}
      onChange={onChange}
    />
  )
}

export default FilterHabitCheckbox
