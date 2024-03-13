import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../Store"
import { useDispatch, useSelector } from "react-redux"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useEffect } from "react"
import { homeImagesUrls } from "../constants"
import { SettingsLegalInfo } from "../subsections/Settings"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeNavbarLocation(0))
  }, [dispatch])

  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src={`/logo-text${colorTheme === "dark" ? "-w" : ""}.svg`}
        sx={{ mx: "auto", maxWidth: 300 }}
      />
      <Button
        sx={{ mx: "auto", mb: 2 }}
        onClick={() => navigate("/habits/1")}
      >
        to habits
      </Button>
      <Typography
        variant="h1"
        sx={{
          mx: "auto",
          maxWidth: 400,
          textAlign: "center",
          mb: 2,
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        You might not have the same <br /> habits as the people on the pictures,{" "}
        <br />
        but you do have something in common. <br /> The ability to change that.
      </Typography>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {homeImagesUrls.map((image, index) => (
          <Box
            component="img"
            key={index}
            src={image.raw_url}
            alt={image.alt}
            sx={{
              width: { xs: 275, md: 250 },
              height: { xs: 300, md: 250 },
              objectFit: "cover",
              objectPosition: "center",
            }}
            onDoubleClick={() => window.open(image.post_url, "_blank")}
          />
        ))}
      </Box>
      <Typography sx={{ textAlign: "center", mb: 4 }}>
        Double click any image for credits
      </Typography>
      <SettingsLegalInfo />
    </Box>
  )
}

export default Home
