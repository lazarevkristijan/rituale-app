import { Button, Typography } from "@mui/material"

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
      >
        There is a millon ways to reach your goals, get everything that you ever
        wanted.. Interesting thing is that everyone who got where you want to
        be, started SMALL. This app will help you start SMALL and in the end
        stack up so many tiny wins that success is the ONLY possible outcome.{" "}
        <br /> <br />
        Project started: 15.09.2023
      </Typography>

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
    </div>
  )
}

export default Hero
