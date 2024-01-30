import axios from "axios"
import { BlogDataTypes } from "../Types"
import { sendNotification } from "./SharedUtils"
import { errorMsgEnding } from "../constants"

export const getAllFinishedProfiles = async () => {
  const res = await axios
    .get(`${import.meta.env.VITE_TLD_BACKEND}/all-finished-profiles`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    )
  return res
}

export const getAllUsers = async () => {
  const res = await axios
    .get(`${import.meta.env.VITE_TLD_BACKEND}/all-users`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    )

  return res
}

export const getAllCompletedHabits = async () => {
  const res = await axios
    .get(`${import.meta.env.VITE_TLD_BACKEND}/all-completed-habits`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    )
  return res
}

export const getAllBlogs = async () => {
  const res = await axios
    .get(`${import.meta.env.VITE_TLD_BACKEND}/all-blogs`)
    .then((response) => response.data)
    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    )

  return res
}

export const handleAddBlog = (e: React.FormEvent, blogData: BlogDataTypes) => {
  e.preventDefault()

  axios
    .post(
      `${import.meta.env.VITE_TLD_BACKEND}/add-blog`,
      JSON.stringify(blogData),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      sendNotification(response.data.success, true)
    })

    .catch((error) =>
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    )
}

export const handleBlogDelete = (id: number) => {
  axios
    .delete(`${import.meta.env.VITE_TLD_BACKEND}/remove-blog`, {
      data: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => sendNotification(response.data.success, true))
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
}
