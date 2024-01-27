import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { Box } from "@mui/material"
import { useQuery } from "react-query"
import { ProfileSkeleton } from "../skeletons"
import { UserTypes } from "../Types"
import { useEffect } from "react"
import ProfileMainPart from "../subsections/Shared/ProfileMainPart"

const PreviewProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(changeNavbarLocation(1))
  }, [dispatch])

  const { username } = useParams()

  const getPreviewUser = async (): Promise<UserTypes> => {
    return await axios
      .get(`http://localhost:5432/user/${username}`)
      .then((response) => {
        if (response.data) {
          return response.data
        } else {
          return navigate("/not-found")
        }
      })
  }
  const { data: previewUser, isLoading: isUserLoading } = useQuery(
    "preview-user-profile",
    getPreviewUser
  )

  const getPreviewCompletedHabits = async () => {
    const res = await axios.get(
      `http://localhost:5432/preview-completed-habits/${username}`
    )

    return res.data
  }
  const { data: previewCompletedHabits, isLoading: areCompletedHabitsLoading } =
    useQuery("get-external-completed-habits", getPreviewCompletedHabits)

  return (
    <Box>
      {isUserLoading || areCompletedHabitsLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <ProfileMainPart
            user={previewUser}
            completedHabits={previewCompletedHabits}
          />
        </>
      )}
    </Box>
  )
}

export default PreviewProfile
