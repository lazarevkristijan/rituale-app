import { useState } from "react"
import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
const BottomNavbar = () => {
  const [value, setValue] = useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(e, newValue) => {
        e
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
  )
}

export default BottomNavbar
