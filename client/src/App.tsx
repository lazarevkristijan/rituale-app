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
  Profile,
  Habits,
  General,
  NotFound,
  Settings,
  Search,
} from "./sections"
import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./Store"
import { ReactQueryDevtools } from "react-query/devtools"
import axios from "axios"
import { addHabit } from "./features/completedHabits/completedHabitsSlice"
import { useEffect, useState } from "react"
import { CompletedHabitTypes, UserSettingsTypes } from "./Types"
import {
  changeColorTheme,
  changeLanguage,
} from "./features/settings/settingsSlice"
import MainLoadingScreen from "./skeletons/MainLoadingScreen"
import PreviewProfile from "./sections/PreviewProfile"
import { useAuth0 } from "@auth0/auth0-react"
import { login } from "./features/session/sessionSlice"
import { GeneralTabBlogs, GeneralTabStatistics } from "./subsections"

const App = () => {
  const dispatch = useDispatch()
  const {
    isAuthenticated: auth0authenticated,
    user: auth0User,
    isLoading: auth0loading,
  } = useAuth0()
  const user = useSelector((state: RootState) => state.session.user)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const postLoginOrRegister = () => {
      axios
        .post(
          "http://localhost:5432/login-or-register",
          JSON.stringify(auth0User),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch(login(response.data[0]))
          axios
            .get(`http://localhost:5432/completed-habits`, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            })
            .then((innerResponse1) => {
              if (!innerResponse1.data.length) return

              const habitIds = innerResponse1.data.map(
                (habit: CompletedHabitTypes) => habit.habit_id
              )
              dispatch(addHabit(habitIds))
            })

          axios
            .get(`http://localhost:5432/user-settings`, {
              withCredentials: true,
            })
            .then((innerResponse2) => {
              const colorTheme = innerResponse2.data.filter(
                (setting: UserSettingsTypes) => setting.setting_id === 1
              )
              const language = innerResponse2.data.filter(
                (setting: UserSettingsTypes) => setting.setting_id === 2
              )

              document.body.style.backgroundColor =
                colorTheme[0].value === "dark" ? "#121212" : "#fff"
              dispatch(changeColorTheme(colorTheme[0].value))
              dispatch(changeLanguage(language[0].value))

              setIsLoading(false)
            })
        })
    }

    auth0authenticated && postLoginOrRegister()
    !auth0authenticated && !auth0loading && setIsLoading(false)
  }, [auth0authenticated, auth0loading, auth0User, user?.id, dispatch])

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
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/user/:id"
                element={<PreviewProfile />}
              />
              <Route
                path="/search/:page"
                element={<Search />}
              />
              <Route
                path="/habits/:page"
                element={<Habits />}
              />
              <Route
                path="/general"
                element={<General />}
              >
                <Route
                  path="blogs/:page"
                  element={<GeneralTabBlogs />}
                />
                <Route
                  path="statistics"
                  element={<GeneralTabStatistics />}
                />
              </Route>
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
