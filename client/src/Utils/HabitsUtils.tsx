import axios from "axios"
import { AppDispatch } from "../Store"
import {
  addHabit,
  clearHabits,
  removeHabit,
} from "../features/completedHabits/completedHabitsSlice"
import { NavigateFunction } from "react-router-dom"
import {
  FilterCategoriesTypes,
  FilterDifficultyTypes,
  FilterStatusTypes,
  HabitFilterTypes,
  HabitTypes,
} from "../Types"

const habitToToggle = (habitId: number) => {
  return {
    habitId: habitId,
    date: new Date().toISOString().split("T")[0],
  }
}
export const removeHabitApi = (habitId: number, dispatch: AppDispatch) => {
  axios
    .post(
      "http://localhost:5432/remove-habit",
      JSON.stringify(habitToToggle(habitId)),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(removeHabit(habitId))
    })
}

export const addHabitApi = (habitId: number, dispatch: AppDispatch) => {
  axios
    .post(
      "http://localhost:5432/complete-habit",
      JSON.stringify(habitToToggle(habitId)),
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

export const getHabits = async () => {
  const res = await axios.get("http://localhost:5432/all-habits")
  return res.data
}

export const handleToggleHabit = (
  e: React.FormEvent<HTMLFormElement>,
  habitId: number,
  completedHabits: number[],
  dispatch: AppDispatch
) => {
  e.preventDefault()

  if (completedHabits.includes(habitId)) {
    removeHabitApi(habitId, dispatch)
  } else {
    addHabitApi(habitId, dispatch)
  }
}

export const handlePinHabit = (habitId: number | null) => {
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
export const resetPage = (
  navigate: NavigateFunction,
  setPage: (page: string) => void
) => {
  if (window.location.href !== "http://localhost:5173/habits/1") {
    navigate("/habits/1")
  }
  setPage("1")
}

export const handleResetHabits = (dispatch: AppDispatch) => {
  axios
    .get("http://localhost:5432/reset-habit-progress", {
      withCredentials: true,
    })
    .then(() => dispatch(clearHabits()))
}

export const filterByCategory = (
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

export const handleFilterChange = <T extends HabitFilterTypes>(
  filter: keyof T,
  setterFunction: (value: React.SetStateAction<T>) => void
) => {
  setterFunction((prev: T) => ({
    ...prev,
    [filter as keyof T]: !prev[filter as keyof T],
  }))
}

export const handleResetFilters = (
  navigate: NavigateFunction,
  setPage: (page: string) => void,
  setFilterCategories: (
    value: React.SetStateAction<FilterCategoriesTypes>
  ) => void,
  setFilterDifficulties: (
    value: React.SetStateAction<FilterDifficultyTypes>
  ) => void,
  setFilterStatus: (value: React.SetStateAction<FilterStatusTypes>) => void
) => {
  resetPage(navigate, setPage)

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

export const filterHabits = (
  setAllFilteredHabits: (value: React.SetStateAction<HabitTypes[]>) => void,
  allHabits: HabitTypes[],
  completedHabits: number[],
  filterCategories: FilterCategoriesTypes,
  filterDifficulties: FilterDifficultyTypes,
  filterStatus: FilterStatusTypes,
  pinnedHabitId?: number
) => {
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
        filterByCategory(h, filterCategories.personal_growth, "Personal growth")
      )
      .sort((a: HabitTypes, b: HabitTypes) => {
        if (a.id === pinnedHabitId) return -1
        if (b.id === pinnedHabitId) return 1
        return 0
      })
  )
}
