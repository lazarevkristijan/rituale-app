import {
  Button,
  Container,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material"
import { BottomNavbar } from "./sections"
import { Routes, Route, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./Store"
import { useEffect, useState } from "react"
import MainLoadingScreen from "./skeletons/MainLoadingScreen"
import { useAuth0 } from "@auth0/auth0-react"
import { TabStatistics, TabBlogs } from "./subsections/General"
import { CookieAcceptPopup } from "./components/Shared"
import {
  handleCookieAccept,
  checkCookieConsent,
  createMuiTheme,
  postLoginOrRegister,
} from "./Utils/AppUtils"
import { lazy, Suspense } from "react"
import { CardsSkeleton, ProfileSkeleton } from "./skeletons"
const Search = lazy(() => import("./sections/Search"))
const PreviewProfile = lazy(() => import("./sections/PreviewProfile"))
const Home = lazy(() => import("./sections/Home"))
const Habits = lazy(() => import("./sections/Habits"))
const General = lazy(() => import("./sections/General"))
const NotFound = lazy(() => import("./sections/NotFound"))
const Settings = lazy(() => import("./sections/Settings"))
const Profile = lazy(() => import("./sections/Profile"))

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

  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
    <main>
      {isLoading ? (
        <MainLoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Container sx={{ mb: "70px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<MainLoadingScreen />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<MainLoadingScreen />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/user/:username"
                element={
                  <Suspense fallback={<ProfileSkeleton preview />}>
                    <PreviewProfile />
                  </Suspense>
                }
              />
              <Route
                path="/search/:page"
                element={
                  <Suspense fallback={<MainLoadingScreen />}>
                    <Search />
                  </Suspense>
                }
              />
              <Route
                path="/habits/:page"
                element={
                  <Suspense fallback={<MainLoadingScreen />}>
                    <Habits />
                  </Suspense>
                }
              />
              <Route
                path="/general"
                element={
                  <Suspense fallback={<MainLoadingScreen />}>
                    <General />
                  </Suspense>
                }
              >
                <Route
                  path="blogs/:page"
                  element={
                    <Suspense fallback={<CardsSkeleton />}>
                      <TabBlogs />
                    </Suspense>
                  }
                />
                <Route
                  path="statistics"
                  element={
                    <Suspense fallback={<MainLoadingScreen />}>
                      <TabStatistics />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="/settings"
                element={
                  <Suspense fallback={<MainLoadingScreen />}>
                    <Settings />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<MainLoadingScreen />}>
                    <NotFound />
                  </Suspense>
                }
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
    </main>
  )
}

export default App
