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

export const getPfpLink = (linkString: string) => {
  try {
    const pfpData = JSON.parse(linkString)
    const pfpURL = pfpData.url
    return pfpURL
  } catch {
    return linkString
  }
}

export const getPfpFileName = (linkString: string) => {
  try {
    const pfpData = JSON.parse(linkString)
    const pfpFileName = pfpData.fileName
    return pfpFileName
  } catch {
    return linkString
  }
}
