import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material"
import axios from "axios"
import { useQuery } from "react-query"
import { HabitTypes } from "../Types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { useState } from "react"
import LockPersonIcon from "@mui/icons-material/LockPerson"
import { useNavigate } from "react-router-dom"
import {
  addHabit,
  clearHabits,
  removeHabit,
} from "../features/completedHabits/completedHabitsSlice"

const Habits = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getHabits = async () => {
    const res = await axios.get("http://localhost:5432/habits")
    return res.data
  }

  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits.habits
  )
  const user = useSelector((state: RootState) => state.session.user)
  const [habitToToggle, setHabitToToggle] = useState(0)

  const { data, isLoading, error } = useQuery("habits", getHabits)

  const handleToggleHabit = (
    e: React.FormEvent<HTMLFormElement>,
    userId: number,
    habitId: number
  ) => {
    e.preventDefault()

    const habitToToggle = {
      habitId: habitId,
      userId: userId,
      date: new Date().toISOString().split("T")[0],
    }

    if (completedHabits.includes(habitId)) {
      axios
        .post(
          "http://localhost:5432/remove-habit",
          JSON.stringify(habitToToggle),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(() => {
          dispatch(removeHabit(habitId))
        })
    } else {
      axios
        .post(
          "http://localhost:5432/complete-habit",
          JSON.stringify(habitToToggle),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(() => {
          dispatch(addHabit(habitId))
        })
    }
  }

  const handleResetClick = () => {
    axios
      .get("http://localhost:5432/reset-habit-progress", {
        withCredentials: true,
      })
      .then(() => dispatch(clearHabits()))
  }

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
      <Box>
        {user && (
          <Button
            sx={{ mb: 2 }}
            onClick={handleResetClick}
          >
            Reset habits
          </Button>
        )}
        <form
          onSubmit={(e) =>
            handleToggleHabit(e, user ? user.id : 0, habitToToggle)
          }
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {data.map((habit: HabitTypes) => (
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
                <Typography>{habit.difficulty}</Typography>
                <br />
                <Chip
                  label={habit.category}
                  color="primary"
                  sx={{ fontSize: 16 }}
                />
              </Box>
              {user ? (
                <Button
                  sx={{ width: "100%" }}
                  type="submit"
                  onClick={() => {
                    setHabitToToggle(habit.id)
                  }}
                >
                  {completedHabits?.includes(habit.id)
                    ? "Completed"
                    : "Not completed"}
                </Button>
              ) : (
                <Tooltip
                  title="Login to access"
                  arrow
                >
                  <Box
                    onClick={() => navigate("/login")}
                    component="div"
                    sx={{
                      width: "100%",
                      bgcolor: "primary.main",
                      borderBottomLeftRadius: "inherit",
                      borderBottomRightRadius: "inherit",
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <IconButton>
                      <LockPersonIcon />
                    </IconButton>
                  </Box>
                </Tooltip>
              )}
            </Box>
          ))}
        </form>
      </Box>
    </Box>
  )
}

export default Habits
