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
const BottomNavbar = () => {
  const navigate = useNavigate()
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
        display: { xs: "flex" },
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
      <BottomNavigationAction
        label="Profile"
        icon={
          !user ? (
            <AccountCircleIcon />
          ) : (
            <Box
              component="img"
              sx={{
                borderRadius: 20,
                border: "3px solid black",
                backgroundColor: "#fff",
              }}
              src={
                user.profile_picture
                  ? getPfpLink(user.profile_picture)
                  : defaultPfpURL
              }
              width={30}
              height={30}
            />
          )
        }
        onClick={() => navigate(user ? "/profile" : "/login")}
      />
    </BottomNavigation>
  )
}

export default BottomNavbar
