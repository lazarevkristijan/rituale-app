import { createSlice } from "@reduxjs/toolkit"

export type sessionState = {
  loggedIn: boolean
  user: {
    first_name: string
    last_name: string
    email: string
  } | null
}

const initialState: sessionState = {
  loggedIn: false,
  user: null,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true
      state.user = action.payload
    },
    logout: (state) => {
      state.loggedIn = false
      state.user = null
    },
  },
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer
