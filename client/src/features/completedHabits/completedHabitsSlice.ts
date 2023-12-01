import { createSlice } from "@reduxjs/toolkit"

export type habitsType = {
  habits: number[]
}

const initialState: habitsType = {
  habits: [],
}

export const completedHabitsSlice = createSlice({
  name: "completed habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      if (!state.habits.length) {
        state.habits = action.payload
      } else {
        state.habits = [...state.habits, action.payload]
      }
    },
    removeHabit: (state, action) => {
      if (state.habits) {
        const habitToRemove = action.payload
        const updatedCompletedHabits = state.habits.filter(
          (habit) => habit !== habitToRemove
        )
        state.habits = updatedCompletedHabits
      }
    },
    clearHabits: (state) => {
      state.habits = []
    },
  },
})

export const { addHabit, removeHabit, clearHabits } =
  completedHabitsSlice.actions

export default completedHabitsSlice.reducer
