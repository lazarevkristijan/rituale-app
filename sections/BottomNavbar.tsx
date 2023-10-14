import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import HomeIcon from "@mui/icons-material/Home"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../src/Store"
import { changeLocation } from "../src/features/bottomNav/bottomNavSlice"

const BottomNavbar = () => {
  const navigate = useNavigate()
  const loggedIn = useSelector((state: RootState) => state.session.loggedIn)
  const navLocation = useSelector((state: RootState) => state.bottomNav.value)
  const dispatch = useDispatch()

  return (
    <BottomNavigation
      value={navLocation}
      onChange={(e, newValue) => {
        e
        dispatch(changeLocation(newValue))
      }}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: { xs: "flex", md: "none" },
        height: 50,
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        onClick={() => navigate("/")}
      />

      <BottomNavigationAction
        label="Habits"
        icon={<SelfImprovementIcon />}
        onClick={() => navigate("/habits")}
      />
      <BottomNavigationAction
        label="Tips"
        icon={<TipsAndUpdatesIcon />}
        onClick={() => navigate("/tips")}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        onClick={() => navigate(loggedIn ? "/profile" : "/login")}
      />
    </BottomNavigation>
  )
}

export default BottomNavbar
