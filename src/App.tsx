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
import { Hero, TopNavbar, BottomNavbar } from "../sections"
import { Routes, Route } from "react-router-dom"

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
})

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <TopNavbar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={<Hero />}
          />
        </Routes>
      </Container>
      <BottomNavbar />
    </ThemeProvider>
  )
}

export default App
