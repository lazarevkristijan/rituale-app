import axios from "axios"
import {
  changeBio,
  changeCountry,
  changeProfilePicture,
  login,
} from "../features/session/sessionSlice"
import { AppDispatch } from "../Store"
import { defaultPfpURL } from "../constants"
import { changeColorTheme } from "../features/settings/settingsSlice"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import { UserTypes } from "../Types"
import { SelectChangeEvent } from "@mui/material"

export const handlePfpDelete = async (
  userPfp: string,
  dispatch: AppDispatch
) => {
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

export const handleThemeChange = (
  colorTheme: string,
  dispatch: AppDispatch
) => {
  axios
    .patch(
      `http://localhost:5432/user-settings/change-theme`,
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
    })
}

export const handleUserDelete = async (
  pfp: string | undefined,
  dispatch: AppDispatch,
  auth0logout: () => void
) => {
  if (pfp) {
    await handlePfpDelete(pfp, dispatch)
  }

  await axios
    .delete(`http://localhost:5432/delete-user`, { withCredentials: true })
    .then(() => {
      dispatch(changeColorTheme("light"))
      document.body.style.backgroundColor = "#fff"

      dispatch(clearHabits())
      auth0logout()
    })
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
  user: UserTypes
) => {
  e.preventDefault()

  axios
    .patch(
      `http://localhost:5432/user-settings/change-creds`,
      JSON.stringify(userData),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(login({ ...user, ...response.data }))
    })
}

export const handleCountryChange = (
  e: SelectChangeEvent,
  dispatch: AppDispatch
) => {
  if (!e.target.value) {
    return console.error("e target is empty")
  }
  axios
    .patch(
      `http://localhost:5432/user-settings/change-country`,
      JSON.stringify({ country: e.target.value }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(changeCountry(e.target.value))
    })
}

export const handleBioChange = (
  bio: string,
  dispatch: AppDispatch,
  setIsBioChanged: (value: React.SetStateAction<boolean>) => void
) => {
  axios
    .patch(
      `http://localhost:5432/user-settings/change-bio`,
      JSON.stringify({ bio: bio }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch(changeBio(bio))
      setIsBioChanged(false)
    })
}

export const getHabitCategories = async () => {
  const res = await axios.get("http://localhost:5432/all-habit-categories")
  return res.data
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
    await axios.patch(
      `http://localhost:5432/remove-priority-category`,
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
  } else {
    if (categoryData.cat1 && categoryData.cat2 && categoryData.cat3) {
      return
    }
    await axios.patch(
      `http://localhost:5432/add-priority-category`,
      JSON.stringify(categoryData),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
  }
}

export const handleProfilePictureChange = async (
  e: React.FormEvent<HTMLFormElement>,
  profilePicture: File | null,
  setProfilePicture: (value: React.SetStateAction<File | null>) => void,
  user: UserTypes,
  dispatch: AppDispatch
) => {
  e.preventDefault()

  if (user?.profile_picture) {
    handlePfpDelete(user.profile_picture, dispatch)
  }

  if (profilePicture) {
    const formData = new FormData()
    formData.append("profilePicture", profilePicture)
    axios
      .patch(
        `http://localhost:5432/user-settings/change-profile-picture`,
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
      })
  } else {
    console.error("no file selected")
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
