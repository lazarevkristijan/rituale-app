import axios from "axios"

export const getUsers = async () => {
  const res = await axios.get("http://localhost:5432/all-users", {
    withCredentials: true,
  })
  return res.data
}
