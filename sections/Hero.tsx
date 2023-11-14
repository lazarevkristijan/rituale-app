import { Box, Button, Typography } from "@mui/material"

const Hero = () => {
  return (
    <div className="mt-[50px] mx-[50px] sm:mx-[100px] md:mx-[150px] lg:mx-[200px] xl:mx-[250px]">
      <img
        src="logo-text.svg"
        alt="logo text"
        className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px] mx-auto mb-[20px]"
      />
      <Typography
        variant="h6"
        align="justify"
        mx={"auto"}
        width={297}
      >
        Habits app, containing all the good habits. Because small wins matter
        the most when scoring for success, the app will help you grow with tiny
        changes <br />
        <br />
        Project started: 15.09.2023
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <a
          href="https://www.linkedin.com/company/98769142/admin/feed/posts/?feedType=following"
          target="_blank"
        >
          <Button variant="contained">LinkedIn</Button>
        </a>
        <a
          href="https://github.com/lazarevkristijan/rituale-app"
          target="_blank"
          className="ml-[20px]"
        >
          <Button variant="contained">GitHub</Button>
        </a>
      </Box>
    </div>
  )
}

export default Hero
