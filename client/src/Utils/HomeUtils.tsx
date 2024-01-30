import axios from "axios"

export const handleCookieAccept = (
  setShowCookieConsentDialog: (value: React.SetStateAction<boolean>) => void
) => {
  setShowCookieConsentDialog(false)
  axios
    .get("https://api.rituale.digital/accept-consent-cookies", {
      withCredentials: true,
      url: "https://rituale.digital",
    })
    .then(() => {
      setShowCookieConsentDialog(false)
    })
    .catch(() => {
      setShowCookieConsentDialog(true)
      console.log("Error when accepting cookie")
    })
}
