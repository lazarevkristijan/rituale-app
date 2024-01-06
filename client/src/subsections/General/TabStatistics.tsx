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
    <Box>
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
            Number of users that have all habits completed:{" "}
            {allFinishedProfiles?.length}
          </Typography>
          <Typography>
            Total count of completed habits: {allCompletedHabits?.length}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default TabStatistics
