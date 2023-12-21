import { Box, Grid, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { useState } from "react"
import { Tip } from "."

const GeneralTabs = () => {
  const [activeTab, setActiveTab] = useState("1")

  const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, bordercolor: "divider" }}>
          <TabList
            aria-label="General tabs"
            onChange={handleChange}
          >
            <Tab
              label="Tips"
              value="1"
            />
            <Tab
              label="Statistics"
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
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
        </TabPanel>
        <TabPanel value="2">Statistics</TabPanel>
      </TabContext>
    </Box>
  )
}

export default GeneralTabs
