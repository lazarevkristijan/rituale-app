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
} from "@mui/material"
import axios from "axios"
import { useQuery } from "react-query"
import {
  FilterCategoriesTypes,
  FilterDifficultyTypes,
  FilterStatusTypes,
  HabitTypes,
} from "../Types"
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
import HabitsSkeleton from "../skeletons/HabitsSkeleton"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { FilterCheckbox } from "../HelperFunctions/filterHabitCheckbox"

const Habits = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(changeLocation(2))

  const user = useSelector((state: RootState) => state.session.user)
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits.habits
  )

  const [filterCategories, setFilterCategories] = useState({
    health: true,
    appearance: true,
    communication: true,
    finance: true,
    productivity: true,
    creativity: true,
    networking: true,
    relationships: true,
    personal_growth: true,
  })
  const [filterDifficulties, setFilterDifficulties] = useState({
    easy: true,
    medium: true,
    hard: true,
  })
  const [filterStatus, setFilterStatus] = useState({
    completed: true,
    not_completed: true,
  })

  const handleCategoriesCheckboxChange = (
    category: keyof FilterCategoriesTypes
  ) => {
    setFilterCategories((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const handleDifficultyCheckboxChange = (
    difficulty: keyof FilterDifficultyTypes
  ) => {
    setFilterDifficulties((prev) => ({
      ...prev,
      [difficulty]: !prev[difficulty],
    }))
  }

  const handleStatusCheckboxChange = (status: keyof FilterStatusTypes) => {
    setFilterStatus((prev) => ({ ...prev, [status]: !prev[status] }))
  }

  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isDifficultyFilterOpen, setIsDifficultyFilterOpen] = useState(false)
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)

  const getHabits = async () => {
    const res = await axios.get("http://localhost:5432/habits")
    return res.data
  }
  const {
    data,
    isLoading: areHabitsLoading,
    error,
  } = useQuery("habits", getHabits)

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

  const handleResetFilters = () => {
    setFilterCategories({
      health: true,
      appearance: true,
      communication: true,
      finance: true,
      productivity: true,
      creativity: true,
      networking: true,
      relationships: true,
      personal_growth: true,
    })
    setFilterDifficulties({
      easy: true,
      medium: true,
      hard: true,
    })
    setFilterStatus({
      completed: true,
      not_completed: true,
    })
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

  const MenuButton = (
    label: string,
    onClick: () => void,
    additionalStyles?: object
  ) => (
    <Button
      sx={{ ml: 2, ...additionalStyles }}
      onClick={onClick}
    >
      {label}
    </Button>
  )

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
          {MenuButton("category filters", () => setIsCategoryFilterOpen(true))}
          {MenuButton("difficulty filters", () =>
            setIsDifficultyFilterOpen(true)
          )}
          {MenuButton("status filters", () => setIsStatusFilterOpen(true))}
          {MenuButton("reset filters", handleResetFilters)}
          {user && MenuButton("reset habits", handleResetHabits)}
        </Box>
        <Box>
          <Dialog
            open={isCategoryFilterOpen}
            onClose={() => setIsCategoryFilterOpen(false)}
            aria-labelledby="category filter dialog"
          >
            <DialogTitle>Filter categories</DialogTitle>
            <DialogContent>
              <FormGroup>
                {Object.entries(filterCategories).map(([key, value], index) => (
                  <Box key={key}>
                    <FilterCheckbox
                      label={
                        key.charAt(0).toUpperCase() +
                        key.slice(1).split("_").join(" ")
                      }
                      checked={value}
                      onChange={() =>
                        handleCategoriesCheckboxChange(
                          key as keyof FilterCategoriesTypes
                        )
                      }
                    />
                    {index !== Object.entries(filterCategories).length - 1 && (
                      <Divider />
                    )}
                  </Box>
                ))}
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
              {Object.entries(filterDifficulties).map(([key, value], index) => (
                <Box key={key}>
                  <FilterCheckbox
                    label={
                      key.charAt(0).toUpperCase() +
                      key.slice(1).split("_").join(" ")
                    }
                    checked={value}
                    onChange={() =>
                      handleDifficultyCheckboxChange(
                        key as keyof FilterDifficultyTypes
                      )
                    }
                  />
                  {index !== Object.entries(filterDifficulties).length - 1 && (
                    <Divider />
                  )}
                </Box>
              ))}
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
                {Object.entries(filterStatus).map(([key, value], index) => (
                  <Box key={key}>
                    <FilterCheckbox
                      label={
                        key.charAt(0).toUpperCase() +
                        key.slice(1).split("_").join(" ")
                      }
                      checked={value}
                      onChange={() =>
                        handleStatusCheckboxChange(
                          key as keyof FilterStatusTypes
                        )
                      }
                    />
                    {index !== Object.entries(filterStatus).length && (
                      <Divider />
                    )}
                  </Box>
                ))}
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
            !filterCategories.personal_growth
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
            {!filterCategories.personal_growth && "Personal growth"}
          </Typography>
          <Typography>
            {!filterDifficulties.easy ||
            !filterDifficulties.medium ||
            !filterDifficulties.hard
              ? "Currently excluding difficulties: "
              : ""}
            {!filterDifficulties.easy && "Easy, "}
            {!filterDifficulties.medium && "Medium, "}
            {!filterDifficulties.hard && "Hard"}
          </Typography>
          <Typography>
            {!filterStatus.completed || !filterStatus.not_completed
              ? "Currently excluding status: "
              : ""}
            {!filterStatus.completed && "Completed, "}
            {!filterStatus.not_completed && "Not completed"}
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
          {areHabitsLoading ? (
            <HabitsSkeleton />
          ) : (
            data
              .filter((h: HabitTypes) => {
                if (filterStatus.completed) {
                  return h
                }
                return !completedHabits.includes(h.id)
              })
              .filter((h: HabitTypes) => {
                if (filterStatus.not_completed) {
                  return h
                }
                return completedHabits.includes(h.id)
              })
              .filter((h: HabitTypes) => {
                if (filterDifficulties.easy) {
                  return h
                }
                return h.difficulty !== "Easy"
              })
              .filter((h: HabitTypes) => {
                if (filterDifficulties.medium) {
                  return h
                }
                return h.difficulty !== "Medium"
              })
              .filter((h: HabitTypes) => {
                if (filterDifficulties.hard) {
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
                filterByCategory(
                  h,
                  filterCategories.productivity,
                  "Productivity"
                )
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
                  filterCategories.personal_growth,
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
              ))
          )}
        </form>
      </Box>
    </Box>
  )
}

export default Habits
