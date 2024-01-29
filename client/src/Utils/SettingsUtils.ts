import axios from "axios"
import {
  changeBio,
  changeCountry,
  changeProfilePicture,
  login,
} from "../features/session/sessionSlice"
import { AppDispatch } from "../Store"
import { defaultPfpURL, errorMsgEnding } from "../constants"
import { changeColorTheme } from "../features/settings/settingsSlice"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import { UserTypes } from "../Types"
import { SelectChangeEvent } from "@mui/material"
import { sendNotification } from "./SharedUtils"

export const handlePfpDelete = async (
  userPfp: string,
  dispatch: AppDispatch,
  replace: boolean
) => {
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
    .then((response) => {
      if (!replace) {
        dispatch(changeProfilePicture(defaultPfpURL))
        sendNotification(response.data.success, true)
      }
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
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

export const handleThemeChange = async (
  colorTheme: string,
  dispatch: AppDispatch,
  setIsUpdating: (value: React.SetStateAction<boolean>) => void
) => {
  await axios
    .patch(
      `https://api.rituale.digital/user-settings/change-theme`,
      JSON.stringify({ theme: colorTheme === "dark" ? "light" : "dark" }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(changeColorTheme(response.data.theme))
      if (response.data.theme === "dark") {
        document.body.style.backgroundColor = "#121212"
      } else {
        document.body.style.backgroundColor = "#fff"
      }
      sendNotification("Successfully changed theme", true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
    .finally(() => setIsUpdating(false))
}

export const handleUserDelete = async (
  pfp: string | undefined,
  dispatch: AppDispatch,
  auth0logout: () => void,
  setIsDeleting: (value: React.SetStateAction<boolean>) => void
) => {
  setIsDeleting(true)

  if (pfp) {
    await handlePfpDelete(pfp, dispatch, false)
  }

  await axios
    .delete(`https://api.rituale.digital/delete-user`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch(changeColorTheme("light"))
      document.body.style.backgroundColor = "#fff"

      dispatch(clearHabits())
      auth0logout()
      sendNotification(response.data.success, true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
    .finally(() => setIsDeleting(false))
}

type LocalUserDataTypes = {
  firstName: string
  lastName: string
  username: string
}

export const handleUserDataChange = (
  e: React.FormEvent<HTMLFormElement>,
  userData: LocalUserDataTypes,
  dispatch: AppDispatch,
  user: UserTypes,
  setIsUpdating: (value: React.SetStateAction<boolean>) => void
) => {
  e.preventDefault()
  setIsUpdating(true)

  axios
    .patch(
      `https://api.rituale.digital/user-settings/change-creds`,
      JSON.stringify(userData),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(login({ ...user, ...response.data }))
      sendNotification("Successfully changed credentials", true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
    .finally(() => setIsUpdating(false))
}

export const handleCountryChange = (
  e: SelectChangeEvent,
  dispatch: AppDispatch,
  setIsUpdating: (value: React.SetStateAction<boolean>) => void
) => {
  setIsUpdating(true)

  if (!e.target.value) {
    return console.error("e target is empty")
  }
  axios
    .patch(
      `https://api.rituale.digital/user-settings/change-country`,
      JSON.stringify({ country: e.target.value }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(changeCountry(e.target.value))
      sendNotification(response.data.success, true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
    .finally(() => setIsUpdating(false))
}

export const handleBioChange = (
  bio: string,
  dispatch: AppDispatch,
  setIsBioChanged: (value: React.SetStateAction<boolean>) => void,
  setIsUpdating: (value: React.SetStateAction<boolean>) => void
) => {
  setIsUpdating(true)

  axios
    .patch(
      `https://api.rituale.digital/user-settings/change-bio`,
      JSON.stringify({ bio: bio }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(changeBio(bio))
      setIsBioChanged(false)
      sendNotification(response.data.success, true)
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
    .finally(() => setIsUpdating(false))
}

export const getHabitCategories = async () => {
  const res = await axios
    .get("https://api.rituale.digital/all-habit-categories")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
  return res
}

export const handleChangePriorityCategory = async (
  newCategory: string,
  newCategoryId: number,
  user: UserTypes
) => {
  const categoryData = {
    cat1: user?.priority_category_1,
    cat2: user?.priority_category_2,
    cat3: user?.priority_category_3,
    userId: user?.id,
    catToChange: newCategory,
    idCatToChange: newCategoryId,
  }

  if (
    categoryData.cat1 === categoryData.catToChange ||
    categoryData.cat2 === categoryData.catToChange ||
    categoryData.cat3 === categoryData.catToChange
  ) {
    const res = await axios
      .patch(
        `https://api.rituale.digital/remove-priority-category`,
        JSON.stringify(
          categoryData.cat1 === categoryData.catToChange
            ? { category_1: categoryData.cat1 }
            : categoryData.cat2 === categoryData.catToChange
            ? { category_2: categoryData.cat2 }
            : categoryData.cat3 === categoryData.catToChange
            ? { category_3: categoryData.cat3 }
            : ""
        ),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        sendNotification(response.data.success, true)
        return "success"
      })
      .catch((error) => {
        sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
        return "error"
      })
    return res
  } else {
    if (categoryData.cat1 && categoryData.cat2 && categoryData.cat3) {
      return sendNotification("Maximum 3 categories is allowed")
    }
    const res = await axios
      .patch(
        `https://api.rituale.digital/add-priority-category`,
        JSON.stringify(categoryData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        sendNotification(response.data.success, true)
        return "success"
      })
      .catch((error) => {
        sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
        return "error"
      })
    return res
  }
}

export const handleProfilePictureChange = async (
  e: React.FormEvent<HTMLFormElement>,
  profilePicture: File | null,
  setProfilePicture: (value: React.SetStateAction<File | null>) => void,
  user: UserTypes,
  dispatch: AppDispatch,
  setIsUploading: (value: React.SetStateAction<boolean>) => void
) => {
  e.preventDefault()
  setIsUploading(true)

  if (user?.profile_picture) {
    handlePfpDelete(user.profile_picture, dispatch, true)
  }

  if (profilePicture) {
    const formData = new FormData()
    formData.append("profilePicture", profilePicture)
    axios
      .patch(
        `https://api.rituale.digital/user-settings/change-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(changeProfilePicture(res.data))
        sendNotification("Successfully changed profile picture", true)
        setIsUploading(false)
      })
      .catch((error) => {
        sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
        setIsUploading(false)
      })
  } else {
    sendNotification("No file selected")
  }
  setProfilePicture(null)
}

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setProfilePicture: (value: React.SetStateAction<File | null>) => void
) => {
  const file = e.target.files && e.target.files[0]
  if (file !== undefined && file !== null) {
    setProfilePicture(file)
  }
}

export const checkUsernameAvail = async (username: string) => {
  const res = await axios
    .get(`https://api.rituale.digital/check-username-availability/${username}`)
    .then((response) => response.status)
    .catch((error) => error.response.status)
  return res
}
