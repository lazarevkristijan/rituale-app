import { createSlice } from "@reduxjs/toolkit"

export type themeState = {
  value: boolean
}

const initialState: themeState = {
  value: true,
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
