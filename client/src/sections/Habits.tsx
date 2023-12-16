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

  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isDifficultyFilterOpen, setIsDifficultyFilterOpen] = useState(false)
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)

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

  const filterByCategory = (
    h: HabitTypes,
    condition: boolean,
    category: string
  ) => {
    if (condition) {
      return h
    }
    return (
      h.category_1 !== category &&
      h.category_2 !== category &&
      h.category_3 !== category
    )
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
            onClick={() => setIsCategoryFilterOpen(true)}
          >
            category filters
          </Button>

          <Button
            sx={{ ml: 2 }}
            onClick={() => setIsDifficultyFilterOpen(true)}
          >
            difficulty filters
          </Button>

          <Button
            sx={{ ml: 2 }}
            onClick={() => setIsStatusFilterOpen(true)}
          >
            status filters
          </Button>

          <Dialog
            open={isCategoryFilterOpen}
            onClose={() => setIsCategoryFilterOpen(false)}
            aria-labelledby="category filter dialog"
          >
            <DialogTitle>Filter categories</DialogTitle>
            <DialogContent>
              <FormGroup>
                <FormControlLabel
                  label="Health"
                  control={<Checkbox checked={filterCategories.health} />}
                  onChange={() => {
                    const currentStatus = filterCategories.health
                    setFilterCategories({
                      ...filterCategories,
                      health: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Appearance"
                  control={<Checkbox checked={filterCategories.appearance} />}
                  onChange={() => {
                    const currentStatus = filterCategories.appearance
                    setFilterCategories({
                      ...filterCategories,
                      appearance: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Communication"
                  control={
                    <Checkbox checked={filterCategories.communication} />
                  }
                  onChange={() => {
                    const currentStatus = filterCategories.communication
                    setFilterCategories({
                      ...filterCategories,
                      communication: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Finance"
                  control={<Checkbox checked={filterCategories.finance} />}
                  onChange={() => {
                    const currentStatus = filterCategories.finance
                    setFilterCategories({
                      ...filterCategories,
                      finance: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Productivity"
                  control={<Checkbox checked={filterCategories.productivity} />}
                  onChange={() => {
                    const currentStatus = filterCategories.productivity
                    setFilterCategories({
                      ...filterCategories,
                      productivity: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Creativity"
                  control={<Checkbox checked={filterCategories.creativity} />}
                  onChange={() => {
                    const currentStatus = filterCategories.creativity
                    setFilterCategories({
                      ...filterCategories,
                      creativity: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Networking"
                  control={<Checkbox checked={filterCategories.networking} />}
                  onChange={() => {
                    const currentStatus = filterCategories.networking
                    setFilterCategories({
                      ...filterCategories,
                      networking: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Relationships"
                  control={
                    <Checkbox checked={filterCategories.relationships} />
                  }
                  onChange={() => {
                    const currentStatus = filterCategories.relationships
                    setFilterCategories({
                      ...filterCategories,
                      relationships: !currentStatus,
                    })
                  }}
                />
                <FormControlLabel
                  label="Personal growth"
                  control={
                    <Checkbox checked={filterCategories.personalGrowth} />
                  }
                  onChange={() => {
                    const currentStatus = filterCategories.personalGrowth
                    setFilterCategories({
                      ...filterCategories,
                      personalGrowth: !currentStatus,
                    })
                  }}
                />
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsCategoryFilterOpen(false)}>
                close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={isDifficultyFilterOpen}
            onClose={() => setIsDifficultyFilterOpen(false)}
            aria-labelledby="difficulty filter dialog"
          >
            <DialogTitle>Filter difficulties</DialogTitle>
            <DialogContent>
              <FormControlLabel
                label="Easy"
                control={<Checkbox checked={filterDifficulty.easy} />}
                onChange={() => {
                  const currentStatus = filterDifficulty.easy
                  setFilterDifficulty({
                    ...filterDifficulty,
                    easy: !currentStatus,
                  })
                }}
              />
              <Divider />
              <FormControlLabel
                label="Medium"
                control={<Checkbox checked={filterDifficulty.medium} />}
                onChange={() => {
                  const currentStatus = filterDifficulty.medium
                  setFilterDifficulty({
                    ...filterDifficulty,
                    medium: !currentStatus,
                  })
                }}
              />
              <Divider />
              <FormControlLabel
                label="Hard"
                control={<Checkbox checked={filterDifficulty.hard} />}
                onChange={() => {
                  const currentStatus = filterDifficulty.hard
                  setFilterDifficulty({
                    ...filterDifficulty,
                    hard: !currentStatus,
                  })
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDifficultyFilterOpen(false)}>
                close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={isStatusFilterOpen}
            onClose={() => setIsStatusFilterOpen(false)}
            aria-labelledby="status filter dialog"
          >
            <DialogTitle>Filter statuses</DialogTitle>
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
              </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsStatusFilterOpen(false)}>
                close
              </Button>
            </DialogActions>
          </Dialog>
          <Typography>
            {!filterCategories.health ||
            !filterCategories.appearance ||
            !filterCategories.communication ||
            !filterCategories.finance ||
            !filterCategories.productivity ||
            !filterCategories.creativity ||
            !filterCategories.networking ||
            !filterCategories.relationships ||
            !filterCategories.personalGrowth
              ? "Currently excluding categories: "
              : ""}
            {!filterCategories.health && "Health, "}
            {!filterCategories.appearance && "Appearance, "}
            {!filterCategories.communication && "Communication, "}
            {!filterCategories.finance && "Finance,  "}
            {!filterCategories.productivity && "Productivity, "}
            {!filterCategories.creativity && "Creativity, "}
            {!filterCategories.networking && "Networking, "}
            {!filterCategories.relationships && "Relationships, "}
            {!filterCategories.personalGrowth && "Personal growth"}
          </Typography>
          <Typography>
            {!filterDifficulty.easy ||
            !filterDifficulty.medium ||
            !filterDifficulty.hard
              ? "Currently excluding difficulties: "
              : ""}
            {!filterDifficulty.easy && "Easy, "}
            {!filterDifficulty.medium && "Medium, "}
            {!filterDifficulty.hard && "Hard"}
          </Typography>
          <Typography>
            {!filterCompleted.completed || !filterCompleted.notCompleted
              ? "Currently excluding status: "
              : ""}
            {!filterCompleted.completed && "Completed, "}
            {!filterCompleted.notCompleted && "Not completed"}
          </Typography>
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
            .filter((h: HabitTypes) => {
              if (filterDifficulty.easy) {
                return h
              }
              return h.difficulty !== "Easy"
            })
            .filter((h: HabitTypes) => {
              if (filterDifficulty.medium) {
                return h
              }
              return h.difficulty !== "Medium"
            })
            .filter((h: HabitTypes) => {
              if (filterDifficulty.hard) {
                return h
              }
              return h.difficulty !== "Hard"
            })
            .filter((h: HabitTypes) =>
              filterByCategory(h, filterCategories.health, "Health")
            )
            .filter((h: HabitTypes) =>
              filterByCategory(h, filterCategories.appearance, "Appearance")
            )
            .filter((h: HabitTypes) =>
              filterByCategory(
                h,
                filterCategories.communication,
                "Communication"
              )
            )
            .filter((h: HabitTypes) =>
              filterByCategory(h, filterCategories.finance, "Finance")
            )
            .filter((h: HabitTypes) =>
              filterByCategory(h, filterCategories.productivity, "Productivity")
            )
            .filter((h: HabitTypes) =>
              filterByCategory(h, filterCategories.creativity, "Creativity")
            )
            .filter((h: HabitTypes) =>
              filterByCategory(h, filterCategories.networking, "Networking")
            )
            .filter((h: HabitTypes) =>
              filterByCategory(
                h,
                filterCategories.relationships,
                "Relationships"
              )
            )
            .filter((h: HabitTypes) =>
              filterByCategory(
                h,
                filterCategories.personalGrowth,
                "Personal growth"
              )
            )
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
