import { createSlice } from "@reduxjs/toolkit"

export interface themeState {
  value: boolean
}

const initialState: themeState = {
  value: false,
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.value = !state.value
    },
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
