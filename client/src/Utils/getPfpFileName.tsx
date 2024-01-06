export const getPfpFileName = (linkString: string) => {
  try {
    const pfpData = JSON.parse(linkString)
    const pfpFileName = pfpData.fileName
    return pfpFileName
  } catch {
    return linkString
  }
}
