import "./index.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import {
  Home,
  TopNavbar,
  BottomNavbar,
  Login,
  Register,
  Profile,
  Habits,
  Tips,
  NotFound,
  ForgotPassword,
  Settings,
} from "../sections"
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./Store"

const App = () => {
  const DarkTheme = useSelector((state: RootState) => state.theme.value)

  const theme = createTheme({
    palette: {
      mode: `${DarkTheme ? "dark" : "light"}`,
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
      <CssBaseline enableColorScheme />
      <TopNavbar />
      <Container>
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
