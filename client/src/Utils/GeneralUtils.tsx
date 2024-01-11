import axios from "axios"
import { BlogDataTypes } from "../Types"

export const getAllFinishedProfiles = async () => {
  const res = await axios.get("http://localhost:5432/all-finished-profiles")
  return res.data
}

export const getAllUsers = async () => {
  const res = await axios.get("http://localhost:5432/all-users")
  return res.data
}

export const getAllCompletedHabits = async () => {
  const res = await axios.get("http://localhost:5432/all-completed-habits")
  return res.data
}

export const getAllBlogs = async () => {
  const res = await axios.get("http://localhost:5432/all-blogs")
  return res.data
}

export const handleAddBlog = (e: React.FormEvent, blogData: BlogDataTypes) => {
  e.preventDefault()

  axios.post("http://localhost:5432/add-blog", JSON.stringify(blogData), {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}

export const initialBlogData = {
  title: "",
  author: "",
  link: "",
  image_url: "",
}

export const handleBlogDelete = (id: number) => {
  axios.delete("http://localhost:5432/remove-blog", {
    data: JSON.stringify({ id: id }),
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  })
}
