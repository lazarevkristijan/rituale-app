import { Box, Button, Typography } from "@mui/material"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { defaultPfpURL } from "../../constants"
import { useNavigate } from "react-router-dom"
import { UserTypes } from "../../Types"

const UserCard = ({
  profile,
  theme,
}: {
  profile: UserTypes
  theme: string
}) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: 300,
        bgcolor: `primary.${theme}`,
        borderRadius: 2,
        p: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          sx={{ display: "flex", alignItems: "center", columnGap: 1, mb: 2 }}
        >
          <Box
            component="img"
            src={getPfpLink(profile.profile_picture || defaultPfpURL)}
            width={50}
            height={50}
            borderRadius={20}
            sx={{
              border: "3px solid black",
              bgcolor: "#fff",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          <Typography>{profile.username}</Typography>
        </Box>
        <Typography>
          {profile.first_name &&
            profile.last_name &&
            `Full name: ${profile.first_name} ${profile.last_name}`}
        </Typography>
        {profile.country && <Typography>Country: {profile.country}</Typography>}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={() => {
            navigate(`/user/${profile.username}`)
          }}
        >
          view
        </Button>
      </Box>
    </Box>
  )
}

export default UserCard
