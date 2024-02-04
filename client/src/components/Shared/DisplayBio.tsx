import React from "react"

export const displayBio = (bio: string | null | undefined) => {
  if (bio === null || bio === undefined) {
    return
  }
  const limitedBio =
    bio.split("\n").slice(0, 4).join("\n") +
    " " +
    bio.split("\n").slice(4).join(" ")

  const formattedBio = limitedBio.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))
  return formattedBio
}

export default displayBio
