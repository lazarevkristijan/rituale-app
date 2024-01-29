import { createSlice } from "@reduxjs/toolkit"
import { SettingsSliceTypes } from "../../Types"

const initialState: SettingsSliceTypes = {
  colorTheme: "light",
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeColorTheme: (state, action) => {
      state.colorTheme = action.payload
    },
  },
})

export const { changeColorTheme } = settingsSlice.actions

export default settingsSlice.reducer
