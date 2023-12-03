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
  },
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer
