import axios from "axios"
import { UserTypes } from "../Types"
import { NavigateFunction } from "react-router-dom"

export const getUsers = async () => {
  const res = await axios.get("http://localhost:5432/all-users", {
    withCredentials: true,
  })
  return res.data
}

export const getPreviewUser = async (
  username: string | undefined,
  navigate: NavigateFunction
): Promise<UserTypes> => {
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

export const getPreviewCompletedHabits = async (
  username: string | undefined
) => {
  const res = await axios.get(
    `http://localhost:5432/preview-completed-habits/${username}`
  )

  return res.data
}
