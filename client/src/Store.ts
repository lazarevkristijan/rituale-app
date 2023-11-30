import { combineReducers, configureStore } from "@reduxjs/toolkit"
import sessionReducer from "./features/session/sessionSlice"
import bottomNavReducer from "./features/bottomNav/bottomNavSlice"
import themeReducer from "./features/theme/themeSlice"
import completedHabitsReducer from "./features/completedHabits/completedHabitsSlice"

const rootReducer = combineReducers({
  session: sessionReducer,
  bottomNav: bottomNavReducer,
  theme: themeReducer,
  completedHabits: completedHabitsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
