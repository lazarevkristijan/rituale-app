import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../Store"
import { useDispatch, useSelector } from "react-redux"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeLocation(0))
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
      <Box bgcolor="red">
        This is a work in progress project. Issues will occur
      </Box>
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
      <p>Hello {user?.first_name}</p>
      <Typography variant="overline">Why habits?</Typography>
      <Typography>
        We don't realise that 90% of our day is habits based, almost everything
        we do is something we've been doing continously every day. Brushing our
        teeth, driving, scrolling our phones etc. it's all automatic, we don't
        put any effort in no matter how easy or hard the task, eventually we get
        into the rhythm.{" "}
      </Typography>
    </Box>
  )
}

export default Home
