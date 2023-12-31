import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import HomeIcon from "@mui/icons-material/Home"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import SearchIcon from "@mui/icons-material/Search"
import { getPfpLink } from "../Utils/getPfpLink"
import { defaultPfpURL } from "../constants"
import { useAuth0 } from "@auth0/auth0-react"
import LoginIcon from "@mui/icons-material/Login"

const BottomNavbar = () => {
  const navigate = useNavigate()

  const { isAuthenticated: auth0authenticated, loginWithPopup: auth0login } =
    useAuth0()

  const user = useSelector((state: RootState) => state.session.user)
  const bottomNavLocation = useSelector(
    (state: RootState) => state.bottomNav.value
  )
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )
  const dispatch = useDispatch()

  return (
    <BottomNavigation
      value={bottomNavLocation}
      onChange={(_e, newValue) => {
        dispatch(changeLocation(newValue))
      }}
      sx={{
        position: "sticky",
        bottom: -1,
        width: "100%",
        height: 50,
        zIndex: 1,
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        label="Search"
        icon={<SearchIcon />}
        onClick={() => navigate("/search/1")}
      />

      <BottomNavigationAction
        label="Habits"
        icon={<SelfImprovementIcon />}
        onClick={() => navigate("/habits/1")}
      />

      <BottomNavigationAction
        label="General"
        icon={<TipsAndUpdatesIcon />}
        onClick={() => navigate("/general/blogs/1")}
      />
      {auth0authenticated ? (
        <BottomNavigationAction
          label="Profile"
          icon={
            <Box
              sx={{
                borderRadius: 20,
                border: `2px solid ${
                  colorTheme === "dark" ? "white" : "black"
                }`,
                backgroundColor: "#fff",
                background: `url('${getPfpLink(
                  user?.profile_picture || defaultPfpURL
                )}') no-repeat center/cover #fff`,
              }}
              width={22.5}
              height={22.5}
            />
          }
          onClick={() => navigate("/profile")}
        />
      ) : (
        <BottomNavigationAction
          icon={<LoginIcon />}
          onClick={() => auth0login()}
        />
      )}
    </BottomNavigation>
  )
}

export default BottomNavbar
