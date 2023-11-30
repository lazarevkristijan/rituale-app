// import "@fontsource/roboto/300.css"
// import "@fontsource/roboto/400.css"
// import "@fontsource/roboto/500.css"
// import "@fontsource/roboto/700.css"
import {
  Container,
  CssBaseline,
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
import { useState } from "react"

const App = () => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(0)
  const checkAuth = () => {
    axios
      .get("http://localhost:5432/check-auth", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(login(response.data.user))
        setUserId(response.data.user.id)
      })
      .catch(() => {})
  }
  checkAuth()

  const getCompletedHabits = (id: number) => {
    if (id === 0) {
      return
    }
    axios
      .get(`http://localhost:5432/completed-habits/${id}`)
      .then((response) => {
        if (!response.data.length) return
        dispatch(addHabit(response.data))
      })
  }
  getCompletedHabits(userId)

  const darkTheme = useSelector((state: RootState) => state.theme.value)

  const theme = createTheme({
    palette: {
      mode: `${darkTheme ? "dark" : "light"}`,
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
