import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{ textAlign: "center", mt: 2, fontWeight: 300, fontSize: 40 }}
        variant="h1"
      >
        TIME TO MAKE REAL CHANGE
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3, mx: "auto" }}
        onClick={() => navigate("/login")}
      >
        LOG IN
      </Button>
      <Typography variant="overline">Why habits?</Typography>
      <Typography>
        We don't realise that 90% of our day is habits based, allmost everything
        we do is something we've been doing continously every day. <br />
        Brushing our teeth, driving, scrolling our phones etc. it's all
        automatic, we don't put any effort in no natter how easy or hard the
        task, eventually we get into the rhythm. lorem*20
      </Typography>
    </Box>
  )
}

export default Home
