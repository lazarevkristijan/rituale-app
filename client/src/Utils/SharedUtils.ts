export const sendNotification = (message: string) => {
  const notification = document.createElement("div")

  notification.style.backgroundColor = "red"

  notification.style.padding = "10px"

  notification.style.minWidth = "150px"
  notification.style.minHeight = "75px"
  notification.style.maxWidth = "200px"
  notification.style.minHeight = "50px"
  notification.style.width = "fit-content"
  notification.style.height = "fit-content"

  notification.style.textAlign = "center"
  notification.style.borderRadius = "20px"

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
  }, 5000)
}
