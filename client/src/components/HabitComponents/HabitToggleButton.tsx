import { Box, Button, Tooltip } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { useAuth0 } from "@auth0/auth0-react"
import LockPersonIcon from "@mui/icons-material/LockPerson"

const HabitToggleButton = ({
  completedHabits,
  habitId,
  setHabitToToggle,
}: {
  completedHabits: number[]
  habitId: number
  setHabitToToggle: (habitId: number) => void
}) => {
  const user = useSelector((state: RootState) => state.session.user)
  const { loginWithRedirect: auth0login } = useAuth0()

  return (
    <Box>
      {user ? (
        <Button
          sx={{
            width: "100%",
            bgcolor: `primary`,
          }}
          type="submit"
          onClick={() => {
            setHabitToToggle(habitId)
          }}
        >
          {completedHabits?.includes(habitId) ? "Completed" : "Not completed"}
        </Button>
      ) : (
        <Tooltip
          title="Login to access"
          arrow
        >
          <Button
            onClick={() => auth0login()}
            sx={{
              width: "100%",
              bgcolor: `primary`,
              borderBottomLeftRadius: "inherit",
              borderBottomRightRadius: "inherit",
              cursor: "pointer",
            }}
          >
            <LockPersonIcon />
          </Button>
        </Tooltip>
      )}
    </Box>
  )
}

export default HabitToggleButton
