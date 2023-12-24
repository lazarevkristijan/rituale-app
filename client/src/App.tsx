import {
  Box,
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
  General,
  NotFound,
  ForgotPassword,
  Settings,
  Search,
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
import MainLoadingScreen from "./skeletons/MainLoadingScreen"
import PreviewProfile from "./sections/PreviewProfile"

const App = () => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

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
    const getUserSettings = () => {
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
          document.body.style.backgroundColor = colorTheme[0].value
          dispatch(changeLanguage(language[0].value))
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    getUserSettings()
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
    <Box>
      {isLoading ? (
        <MainLoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <ReactQueryDevtools />
          <CssBaseline enableColorScheme />
          <Container sx={{ minHeight: "100vh", mt: 2 }}>
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
                path="/user/:id"
                element={<PreviewProfile />}
              />
              <Route
                path="/search"
                element={<Search />}
              />
              <Route
                path="/habits"
                element={<Habits />}
              />
              <Route
                path="/general"
                element={<General />}
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
      )}
    </Box>
  )
}

export default App
