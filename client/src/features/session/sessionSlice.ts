import { createSlice } from "@reduxjs/toolkit"
import { SessionSliceTypes } from "../../Types"

const initialState: SessionSliceTypes = {
  user: null,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    addCategory: (state, action) => {
      if (state.user) {
        if (!state.user.priority_category_1) {
          state.user.priority_category_1 = action.payload
        } else if (!state.user.priority_category_2) {
          state.user.priority_category_2 = action.payload
        } else if (!state.user.priority_category_3) {
          state.user.priority_category_3 = action.payload
        }
      }
    },
    removeCategory: (state, action) => {
      if (state.user) {
        if (action.payload.category_1) {
          state.user.priority_category_1 = null
        } else if (action.payload.category_2) {
          state.user.priority_category_2 = null
        } else if (action.payload.category_3) {
          state.user.priority_category_3 = null
        }
      }
    },
  },
})

export const { login, logout, removeCategory, addCategory } =
  sessionSlice.actions

export default sessionSlice.reducer
