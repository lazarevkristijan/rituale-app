export const getPfpFileName = (linkString: string) => {
  const pfpData = JSON.parse(linkString)
  const pfpFileName = pfpData.fileName
  return pfpFileName
}
