import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface bottomNavState {
  value: number
}

const initialState: bottomNavState = {
  value: 0,
}

export const bottomNavSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { changeLocation } = bottomNavSlice.actions

export default bottomNavSlice.reducer
