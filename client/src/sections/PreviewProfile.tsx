import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { Box } from "@mui/material"
import { useQuery } from "react-query"
import { ProfileSkeleton } from "../skeletons"
import { useEffect } from "react"
import { ProfileMainPart } from "../subsections/Shared"
import { getPreviewCompletedHabits, getPreviewUser } from "../Utils/SearchUtils"

const PreviewProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(changeNavbarLocation(1))
  }, [dispatch])

  const { username } = useParams()

  const { data: previewUser, isLoading: isUserLoading } = useQuery(
    "preview-user-profile",
    () => getPreviewUser(username, navigate)
  )

  const { data: previewCompletedHabits, isLoading: areCompletedHabitsLoading } =
    useQuery("get-external-completed-habits", () =>
      getPreviewCompletedHabits(username)
    )

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
