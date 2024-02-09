import { Box, Breadcrumbs, Link, Typography } from "@mui/material"

const Top = () => {
  return (
    <Box
      sx={{ mb: 2 }}
      component="section"
    >
      <Typography
        component="h2"
        sx={{ fontSize: 50 }}
      >
        Settings
      </Typography>
      <Breadcrumbs separator=">">
        <Link
          href="/profile"
          underline="hover"
        >
          Profile
        </Link>
        <Typography>Settings</Typography>
      </Breadcrumbs>
    </Box>
  )
}

export default Top
