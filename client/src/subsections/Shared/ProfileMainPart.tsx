import { Box, Chip, Tooltip, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { getPfpLink } from "../../Utils/SettingsUtils"
import { countryShorthands, defaultPfpURL } from "../../constants"
import { displayBio } from "../../components/Shared"
import { UserTypes } from "../../Types"
import { useQuery } from "react-query"
import { getAllHabits } from "../../Utils/ProfileUtils"

const ProfileMainPart = ({
  user,
  completedHabits,
}: {
  user: UserTypes | undefined
  completedHabits: number[]
}) => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
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
        flexWrap: "wrap",
        flexDirection: { xs: "column" },
        minWidth: { xs: 300, md: 550 },
        width: "fit-content",
        mx: "auto",
        mt: 2,
      }}
      component="section"
    >
      <Typography sx={{ mb: 1, textAlign: "center" }}>
        {user.username}
      </Typography>
      <Box sx={{ mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            mb: 2,
            flexDirection: { xs: "column", md: "row" },
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Box
                component="img"
                src={getPfpLink(user.profile_picture || defaultPfpURL)}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: `3px solid ${
                    colorTheme === "dark" ? "white" : "black"
                  }`,
                }}
              />
              {(user.first_name || user.last_name || user.country) && (
                <Typography>
                  {user.first_name && (
                    <>
                      {user.first_name} <br />
                    </>
                  )}
                  {user.last_name && (
                    <>
                      {user.last_name} <br />
                    </>
                  )}
                  {user.country && user.country}
                </Typography>
              )}
            </Box>

            <Tooltip
              title="User No."
              placement="bottom"
              arrow
            >
              <Chip
                label={`#${user.id}`}
                color="primary"
                component="span"
                sx={{ width: "fit-content", mx: "auto", mb: 1 }}
              />
            </Tooltip>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
              }}
            >
              <Typography>
                Good Habits:
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {completedHabits.length}{" "}
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
                      (completedHabits.length / allHabits?.length) * 100
                    )}%`,
                    textAlign: "right",
                    bgcolor: "green",
                    borderRadius: 2,
                    color: "#fff",
                    pr: 1,
                  }}
                >
                  {Math.round(
                    (completedHabits.length / allHabits?.length) * 100
                  )}
                  %
                </Box>
              </Box>
              <Typography
                sx={{
                  maxWidth: 200,
                  borderRadius: 1,
                  backgroundColor: `info.${colorTheme}`,
                }}
              >
                {displayBio(user.bio)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: { md: 150 },
            }}
          >
            <Typography sx={{ textAlign: "center" }}>Focused on: </Typography>
            <Chip
              label={user.priority_category_1 || ""}
              sx={{ width: "fit-content", minWidth: 60, mb: 1, mx: "auto" }}
            />
            {user.priority_category_2 && (
              <Chip
                label={user.priority_category_2}
                sx={{ width: "fit-content", minWidth: 60, mb: 1, mx: "auto" }}
              />
            )}
            {user.priority_category_3 && (
              <Chip
                label={user.priority_category_3}
                sx={{ width: "fit-content", minWidth: 60, mb: 1, mx: "auto" }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography>
                Good Habits:
                <Typography
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {completedHabits.length}{" "}
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
                      (completedHabits.length / allHabits?.length) * 100
                    )}%`,
                    textAlign: "right",
                    bgcolor: "green",
                    borderRadius: 2,
                    color: "#fff",
                    pr: 1,
                  }}
                >
                  {Math.round(
                    (completedHabits.length / allHabits?.length) * 100
                  )}
                  %
                </Box>
              </Box>
            </Box>
            <Typography
              sx={{
                maxWidth: 200,
                borderRadius: 1,
                backgroundColor: `info.${colorTheme}`,
              }}
            >
              {displayBio(user.bio)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {user.country && (
        <Box
          component="img"
          src={`https://flagicons.lipis.dev/flags/4x3/${
            countryShorthands[user.country as keyof typeof countryShorthands]
          }.svg`}
          sx={{ width: 150, height: 150, mx: "auto" }}
        />
      )}
    </Box>
  )
}

export default ProfileMainPart
