import { Grid } from "@mui/material"
import { Tip } from "../components"

const GeneralTabTips = () => {
  return (
    <Grid
      gap={2}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <Tip />
      <Tip />
      <Tip />
      <Tip />
    </Grid>
  )
}

export default GeneralTabTips
