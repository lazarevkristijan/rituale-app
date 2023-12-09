import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../Store"

const Tips = () => {
  const language = useSelector((state: RootState) => state.settings.language)
  const tablesContent = () => {
    switch (language) {
      case "en":
        return <p>Spanish tips </p>
      case "es":
        return <p>Spanish tips </p>
      case "de":
        return <p>Spanish tips </p>
      case "fr":
        return <p>French tips</p>
      case "it":
        return <p>Italian tips</p>
    }
  }
  return (
    <Box>
      <Box>
        <h1>Tips</h1>
      </Box>
      <Box>{tablesContent()}</Box>
    </Box>
  )
}

export default Tips
