import { Box, Tab } from "@mui/material"
import { TabContext, TabList } from "@mui/lab"
import React, { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const GeneralTabs = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("1")

  return (
    <Box>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, bordercolor: "divider" }}>
          <TabList
            aria-label="General tabs"
            onChange={(_e: React.SyntheticEvent, newValue: string) => {
              setActiveTab(newValue)
            }}
          >
            <Tab
              label="Blogs"
              value="1"
              onClick={() => navigate("blogs/1")}
            />
            <Tab
              label="Statistics"
              value="2"
              onClick={() => navigate("statistics")}
            />
          </TabList>
        </Box>
        <Outlet />
      </TabContext>
    </Box>
  )
}

export default GeneralTabs
