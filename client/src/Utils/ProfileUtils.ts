import axios from "axios"
import { AppDispatch } from "../Store"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import { logout } from "../features/session/sessionSlice"
import {
  changeColorTheme,
  changeLanguage,
} from "../features/settings/settingsSlice"

export const handleLogout = async (
  dispatch: AppDispatch,
  auth0logout: () => void
) => {
  dispatch(logout())
  dispatch(clearHabits())
  dispatch(changeColorTheme("light"))
  dispatch(changeLanguage("en"))
  document.body.style.backgroundColor = "#fff"
  auth0logout()
}

export const getAllHabits = async () => {
    const res = await axios.get("http://localhost:5432/all-habits")
    return res.data
  }