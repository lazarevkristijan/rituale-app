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
import axios from "axios"
import { useEffect, useState } from "react"

interface UserData {
  name: string
  last_name: string
}

interface HabitsData {
  id: number
  habit: string
  category: string
}

const App = () => {
  const [userData, setUserData] = useState<UserData[]>([])
  const [habitsData, setHabitsData] = useState<HabitsData[]>([])
  useEffect(() => {
    axios
      .get("http://localhost:5174/api/userData")
      .then((response) => setUserData(response.data))
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:5174/api/habitsData")
      .then((response) => setHabitsData(response.data))
  }, [])

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
        {!userData
          ? "Loading..."
          : userData.map((user) => <p key={user.name}>{user.last_name}</p>)}

        {!habitsData
          ? "Loading..."
          : habitsData.map((habit) => <p key={habit.id}>{habit.habit}</p>)}
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
