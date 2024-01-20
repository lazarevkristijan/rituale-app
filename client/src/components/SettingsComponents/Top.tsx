import { Breadcrumbs, Link, Typography } from "@mui/material"
import { UserTypes } from "../../Types"

const Top = ({ user }: { user: UserTypes }) => {
  return (
    <>
      <Typography
        component="h2"
        sx={{ fontSize: 50 }}
      >
        {user?.username}'s settings
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

      <Typography variant="caption">
        Settings that don't have a "SAVE CHANGES" button are auto saved
      </Typography>
    </>
  )
}

export default Top
