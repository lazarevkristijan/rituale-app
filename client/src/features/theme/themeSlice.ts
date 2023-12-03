import { createSlice } from "@reduxjs/toolkit"
import { ThemeSliceTypes } from "../../Types"

const initialState: ThemeSliceTypes = {
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
