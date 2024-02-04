import { Box } from "@mui/material"
import { SingleCardSkeleton } from "."

const HabitsSkeleton = () => {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
      rowGap={5}
    >
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
    </Box>
  )
}

export default HabitsSkeleton
