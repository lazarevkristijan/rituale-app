import { Button } from "@mui/material"

export const FilterButton = (label: string, onClick: () => void) => (
  <Button
    sx={{ ml: 2, bgcolor: `primary` }}
    onClick={onClick}
  >
    {label}
  </Button>
)
