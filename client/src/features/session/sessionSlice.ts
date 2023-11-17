import { createSlice } from "@reduxjs/toolkit"

export type sessionState = {
  loggedIn: boolean
}

const initialState: sessionState = {
  loggedIn: false,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true
    },
    logout: (state) => {
      state.loggedIn = false
    },
  },
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer
