import { Box, Skeleton } from "@mui/material"

const SingleHabitSkeleton = () => {
  return (
    <Box>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={300}
        height={150}
        sx={{
          borderRadius: 2,
        }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={300}
        height={50}
        sx={{
          borderRadius: 2,
        }}
      />
    </Box>
  )
}

export default SingleHabitSkeleton
