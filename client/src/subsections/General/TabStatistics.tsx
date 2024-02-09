import { Box, Typography } from "@mui/material"
import { useQuery } from "react-query"
import {
  getAllCompletedHabits,
  getAllFinishedProfiles,
  getAllUsers,
} from "../../Utils/GeneralUtils"

const TabStatistics = () => {
  const { data: allUsers, isLoading: isLoadingUsers } = useQuery(
    "user-statistics",
    getAllUsers
  )
  const { data: allCompletedHabits, isLoading: isLoadingHabits } = useQuery(
    "habit-statistics",
    getAllCompletedHabits
  )
  const { data: allFinishedProfiles, isLoading: isLoadingProfiles } = useQuery(
    "finished-profile-statistics",
    getAllFinishedProfiles
  )

  return (
    <Box component="section">
      {isLoadingHabits || isLoadingUsers || isLoadingProfiles ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          <Typography
            sx={{ mb: 3 }}
            variant="h3"
          >
            All users statistics combined
          </Typography>

          <Typography>Number of users: {allUsers?.length}</Typography>
          <Typography>
            Users that have all habits completed:{" "}
            {allFinishedProfiles?.length === 0
              ? "0, be the first"
              : allFinishedProfiles.length}
          </Typography>
          <Typography>
            Total completed habits: {allCompletedHabits?.length}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default TabStatistics
