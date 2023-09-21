import "./index.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { CssBaseline } from "@mui/material"
import { Hero, Navbar } from "../sections"

function App() {
  return (
    <CssBaseline enableColorScheme>
      <div className="">
        <Navbar />
        <Hero />
      </div>
    </CssBaseline>
  )
}

export default App
