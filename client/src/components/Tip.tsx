import { Box, Typography } from "@mui/material"

const Tip = () => {
  return (
    <Box
      sx={{ width: 300, height: 350, bgcolor: "primary.dark", borderRadius: 2 }}
    >
      <Box
        component="img"
        sx={{ width: "100%", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <Typography>Title</Typography>
      <Typography>Short description</Typography>
    </Box>
  )
}

export default Tip
