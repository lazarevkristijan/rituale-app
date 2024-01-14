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
