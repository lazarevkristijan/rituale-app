export const sendNotification = (message: string, success: boolean = false) => {
  const notification = document.createElement("div")

  notification.style.backgroundColor = success ? "#cfffdb" : "#ffb3b3"
  notification.style.color = "#000"
  notification.style.padding = "10px"
  notification.style.zIndex = "2"

  notification.style.minWidth = "150px"
  notification.style.minHeight = "75px"
  notification.style.maxWidth = "250px"
  notification.style.minHeight = "50px"
  notification.style.width = "fit-content"
  notification.style.height = "fit-content"

  notification.style.textAlign = "center"
  notification.style.borderRadius = "2px"

  notification.style.position = "fixed"
  notification.style.bottom = "80px"
  notification.style.left = "30px"

  const textParagraph = document.createElement("p")
  textParagraph.textContent = message
  textParagraph.style.margin = "0px"

  document.body.appendChild(notification)
  notification.appendChild(textParagraph)

  setTimeout(() => {
    document.body.removeChild(notification)
  }, 4000)
}
