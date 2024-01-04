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
  Grid,
  Pagination,
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
import React, { useState } from "react"
import LockPersonIcon from "@mui/icons-material/LockPerson"
import {
  addHabit,
  clearHabits,
  removeHabit,
} from "../features/completedHabits/completedHabitsSlice"
import HabitsSkeleton from "../skeletons/HabitsSkeleton"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { FilterCheckbox } from "../HelperFunctions/filterHabitCheckbox"
import PushPinIcon from "@mui/icons-material/PushPin"
import { changePinnedHabit } from "../features/session/sessionSlice"
import StarIcon from "@mui/icons-material/Star"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate, useParams } from "react-router-dom"

const Habits = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  dispatch(changeLocation(2))
  const { loginWithPopup: auth0login } = useAuth0()

  const { page: pageNoParams } = useParams()
  const [page, setPage] = useState(pageNoParams)

  const user = useSelector((state: RootState) => state.session.user)
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits.habits
  )
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
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

  const [pinnedHabitIdShown, setPinnedHabitIdShown] = useState<number | null>(
    null
  )

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

  const resetPage = () => {
    if (window.location.href !== "http://localhost:5173/habits/1") {
      navigate("/habits/1")
    }
    setPage("1")
  }

  const getHabits = async () => {
    const res = await axios.get("http://localhost:5432/all-habits")
    return res.data
  }
  const {
    data: allHabits,
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
    resetPage()

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
      sx={{ ml: 2, bgcolor: `primary.${colorTheme}`, ...additionalStyles }}
      onClick={onClick}
    >
      {label}
    </Button>
  )

  const handlePinHabit = (habitId: number | null) => {
    axios.patch(
      "http://localhost:5432/pin-habit",
      JSON.stringify({ habitId: habitId }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
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
                  <React.Fragment key={key}>
                    <FilterCheckbox
                      label={
                        key.charAt(0).toUpperCase() +
                        key.slice(1).split("_").join(" ")
                      }
                      checked={value}
                      onChange={() => {
                        resetPage()

                        handleCategoriesCheckboxChange(
                          key as keyof FilterCategoriesTypes
                        )
                      }}
                    />
                    {index !== Object.entries(filterCategories).length - 1 && (
                      <Divider />
                    )}
                  </React.Fragment>
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
                <React.Fragment key={key}>
                  <FilterCheckbox
                    label={
                      key.charAt(0).toUpperCase() +
                      key.slice(1).split("_").join(" ")
                    }
                    checked={value}
                    onChange={() => {
                      resetPage()

                      handleDifficultyCheckboxChange(
                        key as keyof FilterDifficultyTypes
                      )
                    }}
                  />
                  {index !== Object.entries(filterDifficulties).length - 1 && (
                    <Divider />
                  )}
                </React.Fragment>
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
                  <React.Fragment key={key}>
                    <FilterCheckbox
                      label={
                        key.charAt(0).toUpperCase() +
                        key.slice(1).split("_").join(" ")
                      }
                      checked={value}
                      onChange={() => {
                        resetPage()

                        handleStatusCheckboxChange(
                          key as keyof FilterStatusTypes
                        )
                      }}
                    />
                    {index !== Object.entries(filterStatus).length && (
                      <Divider />
                    )}
                  </React.Fragment>
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
        <form onSubmit={(e) => handleToggleHabit(e, habitToToggle)}>
          {areHabitsLoading ? (
            <HabitsSkeleton />
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  rowGap: 3,
                }}
              >
                {allHabits &&
                allHabits
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
                    filterByCategory(
                      h,
                      filterCategories.appearance,
                      "Appearance"
                    )
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
                    filterByCategory(
                      h,
                      filterCategories.creativity,
                      "Creativity"
                    )
                  )
                  .filter((h: HabitTypes) =>
                    filterByCategory(
                      h,
                      filterCategories.networking,
                      "Networking"
                    )
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
                  ).length !== 0
                  ? allHabits
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
                        filterByCategory(
                          h,
                          filterCategories.appearance,
                          "Appearance"
                        )
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
                        filterByCategory(
                          h,
                          filterCategories.creativity,
                          "Creativity"
                        )
                      )
                      .filter((h: HabitTypes) =>
                        filterByCategory(
                          h,
                          filterCategories.networking,
                          "Networking"
                        )
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
                      .slice((Number(page) - 1) * 15, Number(page) * 15)
                      .sort((a: HabitTypes, b: HabitTypes) => {
                        if (a.id === user?.pinned_habit) return -1
                        if (b.id === user?.pinned_habit) return 1
                        return 0
                      })
                      .map((habit: HabitTypes) => (
                        <Box
                          component="div"
                          key={habit.id}
                          sx={{
                            display: "flex",
                            position: "relative",
                          }}
                          onMouseOver={() => {
                            if (!user) return
                            setPinnedHabitIdShown(habit.id)
                          }}
                          onMouseLeave={() => {
                            if (!user) return
                            setPinnedHabitIdShown(null)
                          }}
                        >
                          {user?.pinned_habit === habit.id && (
                            <StarIcon
                              sx={{
                                color: "black",
                                position: "absolute",
                                top: 0,
                                right: 0,
                              }}
                            />
                          )}
                          <Box
                            sx={{
                              bgcolor:
                                user?.pinned_habit === habit.id
                                  ? "yellow"
                                  : habit.difficulty === "Easy"
                                  ? `success.${colorTheme}`
                                  : habit.difficulty === "Medium"
                                  ? `warning.${colorTheme}`
                                  : `error.${colorTheme}`,

                              color: "#000",
                              width: 300,
                              borderRadius: 2,
                              textAlign: "center",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ p: 2 }}>
                              <Typography>{habit.description}</Typography>
                              <Box sx={{ height: 50 }}>
                                <Chip
                                  label={habit.difficulty}
                                  sx={{
                                    color: "#000",
                                    bgcolor:
                                      habit.difficulty === "Easy"
                                        ? `success`
                                        : habit.difficulty === "Medium"
                                        ? `warning`
                                        : `error`,
                                  }}
                                />
                              </Box>
                              <Grid
                                gap={1}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                                  alignItems: "center",
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
                              </Grid>
                            </Box>
                            {pinnedHabitIdShown === habit.id && (
                              <Tooltip
                                title={
                                  user?.pinned_habit === habit.id
                                    ? "Unpin"
                                    : "Pin"
                                }
                                arrow
                              >
                                <IconButton
                                  sx={{
                                    position: "absolute",
                                    right: 5,
                                    bottom: 45,
                                  }}
                                  onClick={() => {
                                    if (user?.pinned_habit === habit.id) {
                                      handlePinHabit(null)
                                      dispatch(changePinnedHabit(null))
                                    } else {
                                      handlePinHabit(habit.id)
                                      dispatch(changePinnedHabit(habit.id))
                                    }
                                  }}
                                >
                                  <PushPinIcon
                                    sx={{
                                      color: "black",
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Box>
                              {user ? (
                                <Button
                                  sx={{
                                    width: "100%",
                                    bgcolor: `primary.${colorTheme}`,
                                  }}
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
                                    onClick={() => auth0login()}
                                    component="div"
                                    sx={{
                                      width: "100%",
                                      bgcolor: `primary.${colorTheme}`,
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
                  : "No habits"}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={Math.ceil(
                    allHabits
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
                        filterByCategory(
                          h,
                          filterCategories.appearance,
                          "Appearance"
                        )
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
                        filterByCategory(
                          h,
                          filterCategories.creativity,
                          "Creativity"
                        )
                      )
                      .filter((h: HabitTypes) =>
                        filterByCategory(
                          h,
                          filterCategories.networking,
                          "Networking"
                        )
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
                      ).length / 15
                  )}
                  onChange={(_e, value) => {
                    setPage(String(value))
                    navigate(`/habits/${value}`)
                  }}
                  page={Number(page)}
                />
              </Box>
            </>
          )}
        </form>
      </Box>
    </Box>
  )
}

export default Habits
