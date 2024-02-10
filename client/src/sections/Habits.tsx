import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { HabitTypes } from "../Types"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import { CardsSkeleton } from "../skeletons"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useParams } from "react-router-dom"
import {
  filterHabits,
  getHabits,
  handleToggleHabit,
} from "../Utils/HabitsUtils"
import {
  FilterDialogs,
  HabitCard,
  HabitsPagination,
} from "../components/HabitComponents"
import FilterButtons from "../components/HabitComponents/FilterButtons"

const Habits = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeNavbarLocation(2))
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
    completed:
      localStorage.getItem("completed") === null
        ? true
        : localStorage.getItem("completed") === "true"
        ? true
        : false,
    not_completed:
      localStorage.getItem("not_completed") === null
        ? true
        : localStorage.getItem("not_completed") === "true"
        ? true
        : false,
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
  const [allFilteredHabits, setAllFilteredHabits] = useState<HabitTypes[]>([])

  useEffect(() => {
    !areHabitsLoading &&
      filterHabits(
        setAllFilteredHabits,
        allHabits,
        completedHabits,
        filterCategories,
        filterDifficulties,
        filterStatus,
        user?.pinned_habit || 0
      )
  }, [
    allHabits,
    completedHabits,
    areHabitsLoading,
    user?.pinned_habit,
    filterCategories,
    filterDifficulties,
    filterStatus,
  ])

  return (
    <Box component="section">
      <Typography variant="h2">Habits</Typography>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            rowGap: 1,
          }}
        >
          <FilterButtons
            setIsCategoryFilterOpen={setIsCategoryFilterOpen}
            setIsDifficultyFilterOpen={setIsDifficultyFilterOpen}
            setIsStatusFilterOpen={setIsStatusFilterOpen}
            setPage={setPage}
            setFilterCategories={setFilterCategories}
            setFilterDifficulties={setFilterDifficulties}
            setFilterStatus={setFilterStatus}
          />
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
            <CardsSkeleton />
          ) : (
            <>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  columnGap: 1,
                  rowGap: 3,
                  my: 2,
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
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <HabitsPagination
                  page={page}
                  setPage={setPage}
                  allFilteredHabits={allFilteredHabits}
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
