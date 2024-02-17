import { Button } from "@mui/material"

export const FilterButton = ({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) => (
  <Button
    sx={{ bgcolor: `primary` }}
    onClick={onClick}
  >
    {label}
  </Button>
)

export default FilterButton
