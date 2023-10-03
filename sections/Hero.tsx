import { Box, Button, Typography } from "@mui/material"

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        mt={2}
        sx={{ textAlign: "center" }}
        fontWeight={300}
        fontSize={40}
      >
        TIME TO MAKE REAL CHANGE
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3, mx: "auto" }}
      >
        GET STARTED
      </Button>
      <Typography variant="overline">What's all this?</Typography>
      <Typography>
        We don't realise that 90% of our day is habits based, allmost everything
        we do is something we've been doing continously every day. <br />
        Brushing our teeth, driving, scrolling our phones etc. it's all
        automatic, we don't put any effort in no natter how easy or hard the
        task, eventually it becomes a habit
      </Typography>
    </Box>
  )
}

export default Hero
