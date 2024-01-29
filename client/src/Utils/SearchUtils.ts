import axios from "axios"
import { UserTypes } from "../Types"
import { NavigateFunction } from "react-router-dom"
import { sendNotification } from "./SharedUtils"
import { errorMsgEnding } from "../constants"

export const getUsers = async () => {
  const res = await axios
    .get("https://api.rituale.digital/all-users", {
      withCredentials: true,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
  return res
}

export const getPreviewUser = async (
  username: string | undefined,
  navigate: NavigateFunction
): Promise<UserTypes> => {
  const res = await axios
    .get(`https://api.rituale.digital/user/${username}`)
    .then((response) => {
      if (response.data) {
        return response.data
      } else {
        return navigate("/not-found")
      }
    })
    .catch((error) =>
      sendNotification(`${error.response.data.error} ${errorMsgEnding}`)
    )
  return res
}

export const getPreviewCompletedHabits = async (
  username: string | undefined
) => {
  const res = await axios
    .get(`https://api.rituale.digital/preview-completed-habits/${username}`)
    .then((response) => response.data)
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })

  return res
}
