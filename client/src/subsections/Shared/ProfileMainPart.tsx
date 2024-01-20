import { Box, Chip, Tooltip, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { countryShorthands, defaultPfpURL } from "../../constants"
import { displayBio } from "../../components/Shared/DisplayBio"
import { UserTypes } from "../../Types"
import { useQuery } from "react-query"
import { getAllHabits } from "../../Utils/ProfileUtils"

const ProfileMainPart = ({ user }: { user: UserTypes }) => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits
  )

  const { data: allHabits } = useQuery("get-all-habits", getAllHabits)

  if (!user) return

  return (
    <Box
      sx={{
        bgcolor: `primary.${colorTheme}`,
        borderRadius: 1,
        p: 1,
        mb: 2,
        display: "flex",
      }}
    >
      <Box width="50%">
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              background: `url('${getPfpLink(
                user.profile_picture || defaultPfpURL
              )}') no-repeat center/cover #fff`,
              width: 100,
              height: 100,
              borderRadius: 20,
              border: `3px solid ${colorTheme === "dark" ? "white" : "black"}`,
            }}
          ></Box>
          <Typography sx={{ alignSelf: "center", ml: 1, display: "flex" }}>
            {user.first_name} <br />
            {user.last_name} <br />
            {user.country || "NO COUNTRY"}
          </Typography>
          <Tooltip
            title="User No."
            placement="bottom"
            arrow
            sx={{ ml: 1 }}
          >
            <Chip
              label={`#${user.id}`}
              color="primary"
              component="span"
            />
          </Tooltip>
        </Box>
        <Typography>
          Good Habits:
          <Typography
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {completedHabits.habits.length}{" "}
          </Typography>
          out of{" "}
          <Typography
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {allHabits?.length}
          </Typography>
        </Typography>

        <Box
          sx={{
            border: "2px solid black",
            width: 200,
            borderRadius: 2,
            mb: 1,
            p: 0.3,
            bgcolor: "white",
            color: "black",
            fontWeight: "bold",
          }}
        >
          <Box
            sx={{
              width: `${Math.round(
                (completedHabits.habits.length / allHabits?.length) * 100
              )}%`,
              textAlign: "right",
              bgcolor: "green",
              borderRadius: 2,
            }}
          >
            {Math.round(
              (completedHabits.habits.length / allHabits?.length) * 100
            )}
            %
          </Box>
        </Box>
        <Typography component="span">
          Main Goals:{" "}
          {!user.priority_category_1 &&
            !user.priority_category_2 &&
            !user.priority_category_3 &&
            "None"}{" "}
        </Typography>
        {user.priority_category_1 && (
          <Chip
            label={user.priority_category_1}
            color="primary"
            component="span"
            sx={{ ml: 1 }}
          />
        )}
        {user.priority_category_2 && (
          <Chip
            label={user.priority_category_2}
            color="primary"
            component="span"
            sx={{ ml: 1 }}
          />
        )}
        {user.priority_category_3 && (
          <Chip
            label={user.priority_category_3}
            color="primary"
            component="span"
            sx={{ ml: 1 }}
          />
        )}
        <br />
        <br />
        <Typography component="p">{displayBio(user.bio)}</Typography>
      </Box>

      <Box
        width="50%"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user.country && (
          <Box
            component="img"
            src={`/flags/${
              countryShorthands[user.country as keyof typeof countryShorthands]
            }.svg`}
            width={150}
            height={150}
          />
        )}
      </Box>
    </Box>
  )
}

export default ProfileMainPart
