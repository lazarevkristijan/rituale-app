import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import HomeIcon from "@mui/icons-material/Home"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../src/Store"
import { changeLocation } from "../src/features/bottomNav/bottomNavSlice"
import { useEffect } from "react"

const BottomNavbar = () => {
  const navigate = useNavigate()
  const loggedIn = useSelector((state: RootState) => state.session.loggedIn)
  const bottomNavLocation = useSelector(
    (state: RootState) => state.bottomNav.value
  )
  const dispatch = useDispatch()

  useEffect(() => {
    window.location.href === "http://localhost:5173/"
      ? dispatch(changeLocation(0))
      : window.location.href === "http://localhost:5173/habits"
      ? dispatch(changeLocation(1))
      : window.location.href === "http://localhost:5173/tips"
      ? dispatch(changeLocation(2))
      : window.location.href === "http://localhost:5173/profile"
      ? dispatch(changeLocation(3))
      : window.location.href === "http://localhost:5173/login"
      ? dispatch(changeLocation(3))
      : window.location.href === "http://localhost:5173/forgot-password"
      ? dispatch(changeLocation(3))
      : window.location.href === "http://localhost:5173/register"
      ? dispatch(changeLocation(3))
      : window.location.href === "http://localhost:5173/settings"
      ? dispatch(changeLocation(3))
      : navigate("/not-found")
  }, [navigate, dispatch])

  return (
    <BottomNavigation
      value={bottomNavLocation}
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
