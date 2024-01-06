import axios from "axios"

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
