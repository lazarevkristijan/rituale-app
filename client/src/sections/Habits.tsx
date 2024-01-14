import { Box, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { HabitTypes } from "../Types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import HabitsSkeleton from "../skeletons/HabitsSkeleton"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useNavigate, useParams } from "react-router-dom"
import {
  filterByCategory,
  getHabits,
  handleResetFilters,
  handleResetHabits,
  handleToggleHabit,
} from "../Utils/HabitsUtils"
import { FilterButton } from "../components/HabitComponents/FilterButton"
import FilterDialogs from "../components/HabitComponents/FilterDialogs"
import HabitCard from "../components/HabitComponents/HabitCard"
import HabitsPagination from "../components/HabitComponents/HabitsPagination"

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
          <FilterButton
            label="category filters"
            onClick={() => setIsCategoryFilterOpen(true)}
          />
          <FilterButton
            label="difficulty filters"
            onClick={() => setIsDifficultyFilterOpen(true)}
          />
          <FilterButton
            label="status filters"
            onClick={() => setIsStatusFilterOpen(true)}
          />
          <FilterButton
            label="reset filters"
            onClick={() =>
              handleResetFilters(
                navigate,
                setPage,
                setFilterCategories,
                setFilterDifficulties,
                setFilterStatus
              )
            }
          />
          {user && (
            <FilterButton
              label="reset habits"
              onClick={() => handleResetHabits(dispatch)}
            />
          )}{" "}
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
                        <HabitCard
                          key={habit.id}
                          habit={habit}
                          setHabitToToggle={setHabitToToggle}
                        />
                      ))
                  : "No habits"}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <HabitsPagination
                  page={page}
                  setPage={setPage}
                  allFilteredHabits={allFilteredHabits}
                  navigate={navigate}
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
