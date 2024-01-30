import axios from "axios"
import { sendNotification } from "./SharedUtils"
import { errorMsgEnding } from "../constants"

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
    .catch((error) => {
      setShowCookieConsentDialog(true)
      sendNotification(`${error.response.data.error}, ${errorMsgEnding}`)
    })
}
