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
} from "./sections"
import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./Store"
import { useQuery } from "react-query"
import axios from "axios"
import { ReactQueryDevtools } from "react-query/devtools"

type PersonType = {
  id: number
  first_name: string
  last_name: string
}

const App = () => {
  const { isLoading, data } = useQuery("user-data", async () => {
    return await axios
      .get("https://api.rituale.digital/users")
      .then((response) => response.data)
  })

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
      <ReactQueryDevtools />
      <CssBaseline enableColorScheme />
      <TopNavbar />
      <Container>
        <h1>Hello</h1>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          data && (
            <div>
              {data.map((user: PersonType) => (
                <div key={user.id}>
                  <h2>First name: {user.first_name}</h2>
                </div>
              ))}
            </div>
          )
        )}
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
