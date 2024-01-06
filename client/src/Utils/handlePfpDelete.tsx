import { getPfpFileName } from "./getPfpFileName"
import axios from "axios"
import { changeProfilePicture } from "../features/session/sessionSlice"
import { AppDispatch } from "../Store"
import { defaultPfpURL } from "../constants"

export const handlePfpDelete = async (
  userPfp: string,
  dispatch: AppDispatch
) => {
  if (userPfp) {
    const pfpFileName = getPfpFileName(userPfp)
    await axios
      .delete(`http://localhost:5432/user-settings/delete-profile-picture`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: JSON.stringify({ pfpFileName: pfpFileName }),
      })
      .then(() => {
        dispatch(changeProfilePicture(defaultPfpURL))
      })
  }
}
