import axios from "axios"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useEffect, useState } from "react"
import { SessionSliceTypes } from "../Types"
import { Box, Typography } from "@mui/material"

const UserProfile = () => {
  const dispatch = useDispatch()
  dispatch(changeLocation(2))
  const { id } = useParams()

  const [userData, setUserData] = useState<SessionSliceTypes | null>(null)
  useEffect(() => {
    axios.get(`http://localhost:5432/user/${id}`).then((response) => {
      setUserData(response.data)
      console.log(response.data)
    })
  }, [id])
  return (
    <Box>
      Hello
      <Typography>{userData?.user?.first_name}</Typography>
    </Box>
  )
}

export default UserProfile
