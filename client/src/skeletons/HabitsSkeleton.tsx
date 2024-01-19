import { Box } from "@mui/material"
import { HabitSkeleton } from "."

const HabitsSkeleton = () => {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
      rowGap={5}
    >
      <HabitSkeleton />
      <HabitSkeleton />
      <HabitSkeleton />
      <HabitSkeleton />
      <HabitSkeleton />
    </Box>
  )
}

export default HabitsSkeleton
