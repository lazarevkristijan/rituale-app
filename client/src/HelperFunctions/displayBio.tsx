import React from "react"

export const displayBio = (bio: string | null | undefined) => {
  if (bio === null || bio === undefined) {
    return "NO BIO"
  }
  const limitedBio =
    bio.split("\n").slice(0, 3).join("\n") +
    " " +
    bio.split("\n").slice(3).join(" ")

  const formattedBio = limitedBio.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))
  return formattedBio
}
