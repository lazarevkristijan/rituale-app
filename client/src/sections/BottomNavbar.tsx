import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import HomeIcon from "@mui/icons-material/Home"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import SearchIcon from "@mui/icons-material/Search"
import { getPfpLink } from "../HelperFunctions/getPfpLink"
import { defaultPfpURL } from "../constants"
import { useAuth0 } from "@auth0/auth0-react"
import LoginIcon from "@mui/icons-material/Login"

const BottomNavbar = () => {
  const navigate = useNavigate()

  const { isAuthenticated, loginWithRedirect } = useAuth0()

  const user = useSelector((state: RootState) => state.session.user)
  const bottomNavLocation = useSelector(
    (state: RootState) => state.bottomNav.value
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
        bottom: 0,
        width: "100%",
        height: 50,
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
        onClick={() => navigate("/search")}
      />

      <BottomNavigationAction
        label="Habits"
        icon={<SelfImprovementIcon />}
        onClick={() => navigate("/habits")}
      />

      <BottomNavigationAction
        label="General"
        icon={<TipsAndUpdatesIcon />}
        onClick={() => navigate("/general")}
      />
      {isAuthenticated ? (
        <BottomNavigationAction
          label="Profile"
          icon={
            !user ? (
              <AccountCircleIcon />
            ) : (
              <Box
                sx={{
                  borderRadius: 20,
                  border: "2px solid black",
                  backgroundColor: "#fff",
                  background: `url('${
                    user?.profile_picture
                      ? getPfpLink(user?.profile_picture)
                      : defaultPfpURL
                  }') no-repeat center/cover #fff`,
                }}
                width={22.5}
                height={22.5}
              />
            )
          }
          onClick={() => navigate(user ? "/profile" : "/login")}
        />
      ) : (
        <BottomNavigationAction
          label={user ? "Profile" : ""}
          icon={
            user ? (
              <Box
                sx={{
                  borderRadius: 20,
                  border: "2px solid black",
                  backgroundColor: "#fff",
                  background: `url('${
                    user?.profile_picture
                      ? getPfpLink(user?.profile_picture)
                      : defaultPfpURL
                  }') no-repeat center/cover #fff`,
                }}
                width={22.5}
                height={22.5}
              />
            ) : (
              <LoginIcon />
            )
          }
          onClick={() => loginWithRedirect()}
        />
      )}
    </BottomNavigation>
  )
}

export default BottomNavbar
