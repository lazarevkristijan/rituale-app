import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../src/Store"
import { useSelector } from "react-redux"

const Home = () => {
  const navigate = useNavigate()
  const loggedIn = useSelector((state: RootState) => state.session.loggedIn)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{ textAlign: "center", mb: 3, fontWeight: 300, fontSize: 40 }}
        variant="h1"
      >
        TIME TO MAKE REAL CHANGE
      </Typography>
      <Button
        variant="contained"
        sx={{ mx: "auto" }}
        onClick={() => navigate(loggedIn ? "/habits" : "/login")}
      >
        {loggedIn ? "continue" : "login"}
      </Button>
      <Typography variant="overline">Why habits?</Typography>
      <Typography>
        We don't realise that 90% of our day is habits based, allmost everything
        we do is something we've been doing continously every day. <br />
        Brushing our teeth, driving, scrolling our phones etc. it's all
        automatic, we don't put any effort in no natter how easy or hard the
        task, eventually we get into the rhythm.
      </Typography>
    </Box>
  )
}

export default Home
