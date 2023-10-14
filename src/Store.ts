import { combineReducers, configureStore } from "@reduxjs/toolkit"
import sessionReducer from "./features/session/sessionSlice"
import bottomNavReducer from "./features/bottomNav/bottomNavSlice"

const rootReducer = combineReducers({
  session: sessionReducer,
  bottomNav: bottomNavReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
