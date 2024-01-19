import { combineReducers, configureStore } from "@reduxjs/toolkit"
import sessionReducer from "./features/session/sessionSlice"
import bottomNavReducer from "./features/bottomNav/bottomNavSlice"
import completedHabitsReducer from "./features/completedHabits/completedHabitsSlice"
import settingsReducer from "./features/settings/settingsSlice"

const rootReducer = combineReducers({
  session: sessionReducer,
  bottomNav: bottomNavReducer,
  completedHabits: completedHabitsReducer,
  settings: settingsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
