import { createSlice } from "@reduxjs/toolkit"

export type sessionState = {
  user: {
    first_name: string
    last_name: string
    email: string
  } | null
}

const initialState: sessionState = {
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
  },
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer
