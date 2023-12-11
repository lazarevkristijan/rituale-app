import {
  Container,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import {
  Home,
  BottomNavbar,
  Login,
  Register,
  Profile,
  Habits,
  Tips,
  NotFound,
  ForgotPassword,
  Settings,
} from "./sections"
import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./Store"
import { ReactQueryDevtools } from "react-query/devtools"
import axios from "axios"
import { login } from "./features/session/sessionSlice"
import { addHabit } from "./features/completedHabits/completedHabitsSlice"
import { useEffect, useState } from "react"
import { CompletedHabitTypes, UserSettingsTypes } from "./Types"
import {
  changeColorTheme,
  changeLanguage,
} from "./features/settings/settingsSlice"

const App = () => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    const checkAuth = () => {
      axios
        .get("http://localhost:5432/check-auth", {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(login(response.data.user))
          setUserId(response.data.user.id)
        })
    }
    checkAuth()
  }, [dispatch])

  useEffect(() => {
    const getCompletedHabits = (id: number) => {
      if (id === 0) {
        return
      }
      axios
        .get(`http://localhost:5432/completed-habits`, {
          withCredentials: true,
        })
        .then((response) => {
          if (!response.data.length) return

          const habitIds = response.data.map(
            (habit: CompletedHabitTypes) => habit.habit_id
          )

          dispatch(addHabit(habitIds))
        })
    }
    getCompletedHabits(userId)
  }, [dispatch, userId])

  useEffect(() => {
    const getUserSettings = (id: number) => {
      if (id === 0) {
        return
      }
      axios
        .get(`http://localhost:5432/user-settings`, { withCredentials: true })
        .then((response) => {
          const colorTheme = response.data.filter(
            (setting: UserSettingsTypes) => setting.setting_id === 1
          )
          const language = response.data.filter(
            (setting: UserSettingsTypes) => setting.setting_id === 2
          )
          dispatch(changeColorTheme(colorTheme[0].value))
          dispatch(changeLanguage(language[0].value))
        })
    }
    getUserSettings(userId)
  }, [dispatch, userId])

  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  const theme = createTheme({
    palette: {
      mode: colorTheme as PaletteMode,
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <ReactQueryDevtools />
      <CssBaseline enableColorScheme />
      <Container sx={{ minHeight: "100vh" }}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/habits"
            element={<Habits />}
          />
          <Route
            path="/tips"
            element={<Tips />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Container>
      <BottomNavbar />
    </ThemeProvider>
  )
}

export default App
