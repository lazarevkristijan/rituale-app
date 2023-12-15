import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemText,
  FormGroup,
  Divider,
  FormControlLabel,
  Checkbox,
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
import { categoryFilterOptions, statusFilterOptions } from "../constants"

const Habits = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.session.user)
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits.habits
  )

  const getHabits = async () => {
    const res = await axios.get("http://localhost:5432/habits")
    return res.data
  }

  const [filterCategories, setFilterCategories] = useState({
    health: true,
    appearance: true,
    communication: true,
    finance: true,
    productivity: true,
    creativity: true,
    networking: true,
    relationships: true,
    personalGrowth: true,
  })
  const [filterDifficulty, setFilterDifficulty] = useState({
    easy: true,
    medium: true,
    hard: true,
  })
  const [filterCompleted, setFilterCompleted] = useState({
    completed: true,
    notCompleted: true,
  })

  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

  const { data, isLoading, error } = useQuery("habits", getHabits)

  const [habitToToggle, setHabitToToggle] = useState(0)
  const handleToggleHabit = (
    e: React.FormEvent<HTMLFormElement>,
    habitId: number
  ) => {
    e.preventDefault()

    const habitToToggle = {
      habitId: habitId,
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
          const arrayId = [habitId]
          dispatch(addHabit(arrayId))
        })
    }
  }

  const handleResetHabits = () => {
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
        <Box sx={{ mb: 2 }}>
          {user && <Button onClick={handleResetHabits}>Reset habits</Button>}
          <Button
            sx={{ ml: 2 }}
            onClick={() => setIsFilterDialogOpen(true)}
          >
            filters
          </Button>
          <Dialog
            open={isFilterDialogOpen}
            onClose={() => setIsFilterDialogOpen(false)}
            aria-labelledby="habit filter dialog"
          >
            <DialogTitle>Filter habits</DialogTitle>
            <DialogContent>
              <FormGroup>
                <FormControlLabel
                  label="Completed"
                  control={<Checkbox checked={filterCompleted.completed} />}
                  onChange={() => {
                    const currentStatus = filterCompleted.completed
                    setFilterCompleted({
                      ...filterCompleted,
                      completed: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Not completed"
                  control={<Checkbox checked={filterCompleted.notCompleted} />}
                  onChange={() => {
                    const currentStatus = filterCompleted.notCompleted
                    setFilterCompleted({
                      ...filterCompleted,
                      notCompleted: !currentStatus,
                    })
                  }}
                />
                <Divider />
              </FormGroup>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </Box>
        <form
          onSubmit={(e) => handleToggleHabit(e, habitToToggle)}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            rowGap: 40,
          }}
        >
          {data
            .filter((h: HabitTypes) => {
              if (filterCompleted.completed) {
                return h
              }
              return !completedHabits.includes(h.id)
            })
            .filter((h: HabitTypes) => {
              if (filterCompleted.notCompleted) {
                return h
              }
              return completedHabits.includes(h.id)
            })
            .map((habit: HabitTypes) => (
              <Box
                key={habit.id}
                sx={{ display: "flex" }}
              >
                <Box
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    width: 300,
                    borderRadius: 2,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ p: 2, height: 175 }}>
                    <Typography>{habit.description}</Typography>
                    <Box sx={{ height: 50 }}>
                      <Chip
                        label={habit.difficulty}
                        color={
                          habit.difficulty === "Easy"
                            ? "success"
                            : habit.difficulty === "Medium"
                            ? "warning"
                            : "error"
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        alignItems: "center",
                        height: 70,
                      }}
                    >
                      <Chip
                        label={habit.category_1}
                        color="primary"
                        sx={{ fontSize: 16 }}
                      />
                      {habit.category_2 && (
                        <Chip
                          label={habit.category_2}
                          color="primary"
                          sx={{ fontSize: 16 }}
                        />
                      )}
                      {habit.category_3 && (
                        <Chip
                          label={habit.category_3}
                          color="primary"
                          sx={{ fontSize: 16 }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box>
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
                </Box>
              </Box>
            ))}
        </form>
      </Box>
    </Box>
  )
}

export default Habits
