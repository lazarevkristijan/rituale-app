import { getPfpFileName } from "./SettingsUtils"
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
      .delete(
        `https://api.rituale.digital/user-settings/delete-profile-picture`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          data: JSON.stringify({ pfpFileName: pfpFileName }),
        }
      )
      .then(() => {
        dispatch(changeProfilePicture(defaultPfpURL))
      })
  }
}
