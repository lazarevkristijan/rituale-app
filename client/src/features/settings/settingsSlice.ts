import { createSlice } from "@reduxjs/toolkit"
import { SettingsSliceTypes } from "../../Types"

const initialState: SettingsSliceTypes = {
  colorTheme: "light",
  language: "en",
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeColorTheme: (state, action) => {
      state.colorTheme = action.payload
    },
    changeLanguage: (state, action) => {
      state.language = action.payload
    },
  },
})

export const { changeColorTheme, changeLanguage } = settingsSlice.actions

export default settingsSlice.reducer
