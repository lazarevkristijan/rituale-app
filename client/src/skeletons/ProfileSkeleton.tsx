import { Box, Skeleton } from "@mui/material"

const ProfileSkeleton = ({ preview }: { preview: boolean }) => {
  return (
    <Box sx={{ width: 600, mx: "auto", mt: 2 }}>
      <Skeleton
        variant="rounded"
        height={250}
        sx={{ mb: 1 }}
      />
      {!preview && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
      )}
    </Box>
  )
}

export default ProfileSkeleton
