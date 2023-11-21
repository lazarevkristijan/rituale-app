import { createSlice } from "@reduxjs/toolkit"

export type sessionState = {
  token: string | null
  user: {
    first_name: string
    last_name: string
    email: string
    id: number
  } | null
}

const initialState: sessionState = {
  token: null,
  user: null,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer
