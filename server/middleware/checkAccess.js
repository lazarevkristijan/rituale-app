export const checkAccess = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress
  const clientDomain = req.get("origin")

  const allowedIPs = ["92.53.48.97"]
  const allowedDomains = ["rituale.digital", "http://localhost:5173"]

  console.log(clientDomain)
  console.log(clientIP)

  if (allowedIPs.includes(clientIP) || allowedDomains.includes(clientDomain)) {
    console.log(
      "accessed by: ",
      allowedIPs.includes(clientIP) ? "ip" : "domain"
    )
    next()
  } else {
    console.log("Not authorized")

    return res.status(401).send("Unauthorized")
  }
}
