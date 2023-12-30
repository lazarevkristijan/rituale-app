import { getPfpFileName } from "./getPfpFileName"
import axios from "axios"
import { changeProfilePicture } from "../features/session/sessionSlice"
import { AppDispatch } from "../Store"

export const handlePfpDelete = (
  userPfp: string | null | undefined,
  dispatch: AppDispatch,
  userId: number | undefined
) => {
  if (userPfp) {
    const pfpFileName = getPfpFileName(userPfp)
    axios
      .delete(
        `http://localhost:5432/user-settings/${userId}/delete-profile-picture`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          data: JSON.stringify({ pfpFileName: pfpFileName }),
        }
      )
      .then(() => {
        dispatch(changeProfilePicture(null))
      })
  }
}
