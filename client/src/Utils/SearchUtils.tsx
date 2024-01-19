import axios from "axios"

export const getUsers = async () => {
  const res = await axios.get("https://www.api.rituale.digital/all-users", {
    withCredentials: true,
  })
  return res.data
}
