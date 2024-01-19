import {
  Box,
  Button,
  Container,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  Typography,
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
import TabBlogs from "./subsections/General/TabBlogs"
import TabStatistics from "./subsections/General/TabStatistics"

const App = () => {
  const dispatch = useDispatch()
  const {
    isAuthenticated: auth0authenticated,
    user: auth0User,
    isLoading: auth0loading,
  } = useAuth0()
  const user = useSelector((state: RootState) => state.session.user)

  const [isLoading, setIsLoading] = useState(true)
  const [showCookieConsentDialog, setShowCookieConsentDialog] = useState(false)

  useEffect(() => {
    const postLoginOrRegister = () => {
      axios
        .post(
          "https://www.api.rituale.digital/login-or-register",
          JSON.stringify(auth0User),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch(login(response.data[0]))
          axios
            .get(`https://www.api.rituale.digital/completed-habits`, {
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
            .get(`https://www.api.rituale.digital/user-settings`, {
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

    axios
      .get("https://www.api.rituale.digital/check-cookie-consent", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.error) {
          setShowCookieConsentDialog(true)
        }
      })

    auth0authenticated && postLoginOrRegister()
    !auth0authenticated && !auth0loading && setIsLoading(false)
    !auth0authenticated &&
      !auth0loading &&
      (document.body.style.backgroundColor = "#fff")
  }, [auth0authenticated, auth0loading, auth0User, user?.id, dispatch])

  const handleCookieAccept = () => {
    setShowCookieConsentDialog(false)
    axios
      .get("https://www.api.rituale.digital/accept-consent-cookies", {
        withCredentials: true,
      })
      .then(() => {
        setShowCookieConsentDialog(false)
      })
      .catch(() => {
        setShowCookieConsentDialog(true)
        console.log("Error when accepting cookie")
      })
  }

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
                path="/user/:username"
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
                  element={<TabBlogs />}
                />
                <Route
                  path="statistics"
                  element={<TabStatistics />}
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
          {showCookieConsentDialog && (
            <Box
              sx={{
                position: "fixed",
                right: 20,
                bottom: 60,
                width: 300,
                height: 200,
                bgcolor: "white",
                color: "black",
                borderRadius: 2,
                border: "3px solid red",
                p: 1,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Typography>
                We use only essential cookies, by using our website, you accept
                cookies for authentication, security, theme and images
              </Typography>
              <Button onClick={handleCookieAccept}>i understand</Button>
            </Box>
          )}
        </ThemeProvider>
      )}
    </Box>
  )
}

export default App
