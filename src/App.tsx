import "./index.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Hero, TopNavbar, BottomNavbar } from "../sections"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <TopNavbar />
      <Hero />
      <BottomNavbar />
    </ThemeProvider>
  )
}

export default App
