import {
  Box,
  Button,
  Container,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
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
import { useEffect, useState } from "react"
import MainLoadingScreen from "./skeletons/MainLoadingScreen"
import PreviewProfile from "./sections/PreviewProfile"
import { useAuth0 } from "@auth0/auth0-react"
import TabBlogs from "./subsections/General/TabBlogs"
import TabStatistics from "./subsections/General/TabStatistics"
import CookieAcceptPopup from "./components/CookieAcceptPopup"
import { handleCookieAccept } from "./Utils/AppUtils"
import {
  checkCookieConsent,
  createMuiTheme,
  postLoginOrRegister,
} from "./Utils/AppUtils"

const App = () => {
  const dispatch = useDispatch()

  const {
    isAuthenticated: auth0authenticated,
    user: auth0User,
    isLoading: auth0loading,
  } = useAuth0()
  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  const [isLoading, setIsLoading] = useState(true)
  const [showCookieConsentDialog, setShowCookieConsentDialog] = useState(false)

  useEffect(() => {
    checkCookieConsent(setShowCookieConsentDialog)

    auth0authenticated && postLoginOrRegister(auth0User, dispatch, setIsLoading)
    !auth0authenticated && !auth0loading && setIsLoading(false)
    !auth0authenticated &&
      !auth0loading &&
      (document.body.style.backgroundColor = "#fff")
  }, [auth0authenticated, auth0loading, auth0User, user?.id, dispatch])

  const theme = createMuiTheme(colorTheme as PaletteMode)

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
            <CookieAcceptPopup>
              <Button
                onClick={() => handleCookieAccept(setShowCookieConsentDialog)}
              >
                i understand
              </Button>
            </CookieAcceptPopup>
          )}
        </ThemeProvider>
      )}
    </Box>
  )
}

export default App
