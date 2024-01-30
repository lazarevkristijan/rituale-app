import axios from "axios"
import { AppDispatch } from "../Store"
import { login } from "../features/session/sessionSlice"
import { CompletedHabitTypes, UserSettingsTypes } from "../Types"
import { addHabit } from "../features/completedHabits/completedHabitsSlice"
import { changeColorTheme } from "../features/settings/settingsSlice"
import { User } from "@auth0/auth0-react"
import { PaletteMode, createTheme } from "@mui/material"
import { sendNotification } from "./SharedUtils"
import { errorMsgEnding } from "../constants"

export const postLoginOrRegister = (
  auth0User: User | undefined,
  dispatch: AppDispatch,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) => {
  axios
    .post(
      `${import.meta.env.VITE_TLD_BACKEND}/login-or-register`,
      JSON.stringify(auth0User),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then((response) => {
      dispatch(login(response.data[0]))
      axios
        .get(`${import.meta.env.VITE_TLD_BACKEND}/completed-habits`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((innerResponse1) => {
          if (!innerResponse1.data.length) return

          const habitIds = innerResponse1.data.map(
            (habit: CompletedHabitTypes) => habit.habit_id
          )
          dispatch(addHabit(habitIds))
        })

      axios
        .get(`${import.meta.env.VITE_TLD_BACKEND}/user-settings`, {
          withCredentials: true,
        })
        .then((innerResponse2) => {
          const colorTheme = innerResponse2.data.filter(
            (setting: UserSettingsTypes) => setting.setting_id === 1
          )

          document.body.style.backgroundColor =
            colorTheme[0].value === "dark" ? "#121212" : "#fff"
          dispatch(changeColorTheme(colorTheme[0].value))

          setIsLoading(false)
        })
    })
    .catch(() => sendNotification(`Error when logging in, ${errorMsgEnding}`))
}

export const checkCookieConsent = (
  setShowCookieConsentDialog: (value: React.SetStateAction<boolean>) => void
) => {
  axios
    .get(`${import.meta.env.VITE_TLD_BACKEND}/check-cookie-consent`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.error) {
        setShowCookieConsentDialog(true)
      }
    })
    .catch((error) => {
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
}

export const createMuiTheme = (colorTheme: PaletteMode) =>
  createTheme({
    palette: {
      mode: colorTheme,
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
      },
    },
  })

export const handleCookieAccept = (
  setShowCookieConsentDialog: (value: React.SetStateAction<boolean>) => void
) => {
  setShowCookieConsentDialog(false)
  axios
    .get(`${import.meta.env.VITE_TLD_BACKEND}/accept-consent-cookies`, {
      withCredentials: true,
      url: "https://rituale.digital",
    })
    .then(() => {
      setShowCookieConsentDialog(false)
    })
    .catch((error) => {
      setShowCookieConsentDialog(true)
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
}
