import { Box } from "@mui/material"
import { SingleHabitSkeleton } from "."

const HabitsSkeleton = () => {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
      rowGap={5}
    >
      <SingleHabitSkeleton />
      <SingleHabitSkeleton />
      <SingleHabitSkeleton />
      <SingleHabitSkeleton />
      <SingleHabitSkeleton />
    </Box>
  )
}

export default HabitsSkeleton
