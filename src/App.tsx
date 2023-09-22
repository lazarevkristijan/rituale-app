import "./index.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import {
  CssBaseline,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material"
import { Hero, Navbar } from "../sections"
import { useState } from "react"
import SettingsIcon from "@mui/icons-material/Settings"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"

const App = () => {
  const [value, setValue] = useState(0)

  return (
    <CssBaseline enableColorScheme>
      <Box>
        <Navbar />
        <Hero />
        <BottomNavigation
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue)
          }}
          sx={{
            position: "sticky",
            bottom: 0,
            width: "100%",
            display: { xs: "flex", md: "none" },
            height: 50,
          }}
        >
          <BottomNavigationAction
            label="Habits"
            icon={<SelfImprovementIcon />}
          />
          <BottomNavigationAction
            label="Tips"
            icon={<TipsAndUpdatesIcon />}
          />
          <BottomNavigationAction
            label="Settings"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Box>
    </CssBaseline>
  )
}

export default App
