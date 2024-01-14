import { Box, Skeleton } from "@mui/material"

const ProfileSkeleton = () => {
  return (
    <Box>
      <Skeleton
        variant="text"
        height={90}
        width={200}
      />
      <Skeleton
        variant="rounded"
        height={200}
        sx={{ mb: 1 }}
      />
      <Box sx={{ display: "flex" }}>
        <Skeleton
          variant="rounded"
          width={100}
          height={40}
        />
        <Skeleton
          variant="rounded"
          width={100}
          height={40}
          sx={{ ml: 1 }}
        />
      </Box>
    </Box>
  )
}

export default ProfileSkeleton
