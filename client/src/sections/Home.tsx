import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../Store"
import { useDispatch, useSelector } from "react-redux"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { homeImagesUrls } from "../constants"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeNavbarLocation(0))
  }, [dispatch])

  const { loginWithPopup: auth0login } = useAuth0()

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src={`/logo-text${colorTheme === "dark" ? "-w" : ""}.svg`}
        width={300}
        sx={{ mx: "auto" }}
      />
      <Button
        sx={{ mx: "auto" }}
        onClick={() => (user ? navigate("/habits/1") : auth0login())}
      >
        {user ? "continue" : "login"}
      </Button>
      <br />
      <br />
      <Typography
        textAlign="center"
        width={400}
        mx={"auto"}
      >
        You might not have the same habits as the people on the pictures, but
        you do have something in common.. The ability to change that.
      </Typography>
      <br />
      <Box
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
              width: 250,
              height: 250,
              objectFit: "cover",
              objectPosition: "center",
            }}
            onDoubleClick={() => window.open(image.post_url, "_blank")}
          />
        ))}

        <Typography>Double click any image for credits</Typography>
      </Box>
    </Box>
  )
}

export default Home
