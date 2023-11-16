import "./Login.css"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { login } from "../features/session/sessionSlice"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

type FormValues = {
  email: string
  password: string
}

const Login = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm<FormValues>()
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data)
  }

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ textAlign: "center", mb: 2 }}
      >
        LOGIN
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="formControl">
          <TextField
            label="Email"
            autoFocus
            sx={{ mb: 1 }}
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid Email format",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="formControl">
          <TextField
            label="Password"
            sx={{ mb: 3 }}
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <Button
          sx={{ mr: 1 }}
          // onClick={() => {
          //   dispatch(login())
          // navigate("/")
          // }}
          type="submit"
        >
          login
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button onClick={() => navigate("/forgot-password")}>
              forgot password?
            </Button>
          </Box>
          <Button onClick={() => navigate("/register")}>register</Button>
        </Box>
      </form>
      <DevTool control={control} />
    </Box>
  )
}

export default Login
