import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../Store"
import { useEffect } from "react"
import { ProfileSkeleton } from "../skeletons"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { ProfileMainPart } from "../subsections/Shared"
import { ProfileAuthPart } from "../subsections/Profile"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeNavbarLocation(4))
  }, [dispatch])

  const {
    logout: auth0logout,
    isAuthenticated: auth0authenticated,
    isLoading: auth0loading,
  } = useAuth0()
  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  const user = useSelector((state: RootState) => state.session.user)

  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits
  )

  if (!user) return

  return (
    <Box component="section">
      {auth0loading ? (
        <ProfileSkeleton preview={false} />
      ) : (
        <>
          <ProfileMainPart
            user={user}
            completedHabits={completedHabits.habits}
          />
          <ProfileAuthPart logout={auth0logout} />
        </>
      )}
    </Box>
  )
}

export default Profile
