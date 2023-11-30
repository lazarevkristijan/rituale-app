import { createSlice } from "@reduxjs/toolkit"

export type habitsType = {
  habits: number[] | null
}

const initialState: habitsType = {
  habits: null,
}

export const completedHabitsSlice = createSlice({
  name: "completed habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      if (state.habits === null) {
        state.habits = []
      }
      state.habits.push(action.payload)
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
  },
})

export const { addHabit, removeHabit } = completedHabitsSlice.actions

export default completedHabitsSlice.reducer
