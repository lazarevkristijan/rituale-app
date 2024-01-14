import {
  Box,
  Chip,
  IconButton,
  Typography,
  Tooltip,
  Grid,
  Pagination,
} from "@mui/material"
import { useQuery } from "react-query"
import { HabitTypes } from "../Types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import HabitsSkeleton from "../skeletons/HabitsSkeleton"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import PushPinIcon from "@mui/icons-material/PushPin"
import { changePinnedHabit } from "../features/session/sessionSlice"
import StarIcon from "@mui/icons-material/Star"
import { useNavigate, useParams } from "react-router-dom"
import {
  filterByCategory,
  getHabits,
  handlePinHabit,
  handleResetFilters,
  handleResetHabits,
  handleToggleHabit,
} from "../Utils/HabitsUtils"
import { FilterButton } from "../components/HabitComponents/FilterButton"
import HabitToggleButton from "../components/HabitComponents/HabitToggleButton"
import FilterDialogs from "../components/HabitComponents/FilterDialogs"

const Habits = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(changeLocation(2))
  }, [dispatch])

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

  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isDifficultyFilterOpen, setIsDifficultyFilterOpen] = useState(false)
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)

  const {
    data: allHabits,
    isLoading: areHabitsLoading,
    error: errorGettingHabits,
  } = useQuery("habits", getHabits)

  const [habitToToggle, setHabitToToggle] = useState(0)
  const [allFilteredHabits, setAllFilteredHabits] = useState<Array<HabitTypes>>(
    []
  )

  useEffect(() => {
    !areHabitsLoading &&
      setAllFilteredHabits(
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
            filterByCategory(h, filterCategories.appearance, "Appearance")
          )
          .filter((h: HabitTypes) =>
            filterByCategory(h, filterCategories.communication, "Communication")
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
            filterByCategory(h, filterCategories.relationships, "Relationships")
          )
          .filter((h: HabitTypes) =>
            filterByCategory(
              h,
              filterCategories.personal_growth,
              "Personal growth"
            )
          )
          .sort((a: HabitTypes, b: HabitTypes) => {
            if (a.id === user?.pinned_habit) return -1
            if (b.id === user?.pinned_habit) return 1
            return 0
          })
      )
  }, [
    allHabits,
    completedHabits,
    areHabitsLoading,
    user?.pinned_habit,
    filterCategories.appearance,
    filterCategories.communication,
    filterCategories.creativity,
    filterCategories.finance,
    filterCategories.health,
    filterCategories.networking,
    filterCategories.personal_growth,
    filterCategories.productivity,
    filterCategories.relationships,
    filterDifficulties.easy,
    filterDifficulties.hard,
    filterDifficulties.medium,
    filterStatus.completed,
    filterStatus.not_completed,
  ])

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
          {FilterButton("category filters", () =>
            setIsCategoryFilterOpen(true)
          )}
          {FilterButton("difficulty filters", () =>
            setIsDifficultyFilterOpen(true)
          )}
          {FilterButton("status filters", () => setIsStatusFilterOpen(true))}
          {FilterButton("reset filters", () =>
            handleResetFilters(
              navigate,
              setPage,
              setFilterCategories,
              setFilterDifficulties,
              setFilterStatus
            )
          )}
          {user &&
            FilterButton("reset habits", () => handleResetHabits(dispatch))}
        </Box>
        <Box>
          <FilterDialogs
            isCategoryFilterOpen={isCategoryFilterOpen}
            setIsCategoryFilterOpen={setIsCategoryFilterOpen}
            filterCategories={filterCategories}
            setFilterCategories={setFilterCategories}
            isDifficultyFilterOpen={isDifficultyFilterOpen}
            setIsDifficultyFilterOpen={setIsDifficultyFilterOpen}
            filterDifficulties={filterDifficulties}
            setFilterDifficulties={setFilterDifficulties}
            isStatusFilterOpen={isStatusFilterOpen}
            setIsStatusFilterOpen={setIsStatusFilterOpen}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
          />
        </Box>
        <form
          onSubmit={(e) =>
            handleToggleHabit(e, habitToToggle, completedHabits, dispatch)
          }
        >
          {errorGettingHabits ? (
            <Typography>Error getting habits</Typography>
          ) : areHabitsLoading ? (
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
                {allFilteredHabits.length !== 0
                  ? allFilteredHabits
                      .slice((Number(page) - 1) * 15, Number(page) * 15)
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
                            <HabitToggleButton
                              completedHabits={completedHabits}
                              habitId={habit.id}
                              setHabitToToggle={setHabitToToggle}
                            />
                          </Box>
                        </Box>
                      ))
                  : "No habits"}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={Math.ceil(allFilteredHabits.length / 15)}
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
