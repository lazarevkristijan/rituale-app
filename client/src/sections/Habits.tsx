import { Box, Chip, Typography } from "@mui/material"
import axios from "axios"
import { useQuery } from "react-query"
import { HabitTypes } from "../Types"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const Habits = () => {
  const getHabits = async () => {
    const res = await axios.get("http://localhost:5432/habits")
    return res.data
  }

  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits.habits
  )

  const { data, isLoading, error } = useQuery("habits", getHabits)

  if (isLoading) {
    return <Typography component="h1">Loading...</Typography>
  }
  if (error) {
    return <Typography component="h1">Error getting habits</Typography>
  }

  return (
    <Box>
      <Typography
        component="h1"
        sx={{ fontSize: 50 }}
      >
        Habits
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {data.map((habit: HabitTypes) => {
          return (
            <Box
              key={habit.id}
              sx={{
                bgcolor: "#fff",
                color: "#000",
                width: 300,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography>{habit.description}</Typography>
                <br />
                <Chip
                  label={habit.category}
                  color="primary"
                  sx={{ fontSize: 16 }}
                />
                <Typography>{habit.id}</Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  bgcolor: "primary.main",
                  borderBottomLeftRadius: "inherit",
                  borderBottomRightRadius: "inherit",
                  p: 1,
                }}
              >
                <Typography>
                  {completedHabits?.includes(habit.id)
                    ? "Completed"
                    : "Not completed"}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Habits
