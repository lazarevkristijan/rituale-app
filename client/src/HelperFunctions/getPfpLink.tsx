export const getPfpLink = (linkString: string) => {
  const pfpData = JSON.parse(linkString)
  const pfpURL = pfpData.url
  return pfpURL
}
