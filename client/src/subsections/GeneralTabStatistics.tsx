import { Box, Typography } from "@mui/material"
import axios from "axios"
import { useQuery } from "react-query"

const GeneralTabStatistics = () => {
  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:5432/all-users")
    return res.data
  }
  const { data: allUsers, isLoading: isLoadingUsers } = useQuery(
    "user-statistics",
    getAllUsers
  )

  const getAllCompletedHabits = async () => {
    const res = await axios.get("http://localhost:5432/all-completed-habits")
    return res.data
  }
  const { data: allCompletedHabits, isLoading: isLoadingHabits } = useQuery(
    "habit-statistics",
    getAllCompletedHabits
  )

  const getAllFinishedProfiles = async () => {
    const res = await axios.get("http://localhost:5432/all-finished-profiles")
    return res.data
  }
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

export default GeneralTabStatistics
