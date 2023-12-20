import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material"
import { RootState } from "../Store"
import React from "react"
import { countryShorthands } from "../constants"
import { useQuery } from "react-query"
import MainLoadingScreen from "../skeletons/MainLoadingScreen"

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  dispatch(changeLocation(1))

  const { id } = useParams()

  const darkTheme = useSelector((state: RootState) => state.settings.colorTheme)

  const getNewUser = async () => {
    const res = await axios.get(`http://localhost:5432/user/${id}`)
    return res.data
  }
  const { data, isLoading } = useQuery("external-user-profile", getNewUser)

  const getNewCompletedHabits = async () => {
    const res = await axios.get(
      `http://localhost:5432/new-completed-habits/${id}`
    )
    return res.data
  }
  const { data: newCompletedHabits, isLoading: isNewLoading } = useQuery(
    "get-external-completed-habits",
    getNewCompletedHabits
  )

  const displayBio = (bio: string | null | undefined) => {
    if (bio === null || bio === undefined) {
      return "NO BIO"
    }
    const formattedBio = bio.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
    return formattedBio
  }

  let pfpURL
  if (data) {
    const pfpData = JSON.parse(data.profile_picture)
    pfpURL = pfpData.url
  }

  return (
    <Box>
      {isLoading || isNewLoading ? (
        <MainLoadingScreen />
      ) : (
        <>
          <Typography variant="h3">{data.first_name}'s Profile</Typography>

          <Box
            sx={{
              bgcolor: `primary.${darkTheme ? "dark" : "light"}`,
              borderRadius: 1,
              p: 1,
              mb: 2,
              display: "flex",
              height: 300,
            }}
          >
            <Box width="50%">
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    background: `url('${pfpURL}') no-repeat center/cover #fff`,
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                    border: "3px solid black",
                  }}
                ></Box>
                <Typography
                  sx={{ alignSelf: "center", ml: 1, display: "flex" }}
                >
                  {data.first_name} <br />
                  {data.last_name} <br />
                  {data.email} <br />
                  {data.country || "NO COUNTRY"}
                </Typography>
                <Tooltip
                  title="User No."
                  placement="bottom"
                  arrow
                  sx={{ ml: 1 }}
                >
                  <Chip
                    label={`#${data.id}`}
                    color="primary"
                    component="span"
                  />
                </Tooltip>
              </Box>
              <Typography>
                Good Habits:{" "}
                <Typography component="span">
                  {newCompletedHabits.length}
                </Typography>
              </Typography>
              <Typography component="span">
                Main Goals:{" "}
                {!data.priority_category_1 &&
                  !data.priority_category_2 &&
                  !data.priority_category_3 &&
                  "None"}{" "}
              </Typography>
              {data.priority_category_1 && (
                <Chip
                  label={data.priority_category_1}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              {data.priority_category_2 && (
                <Chip
                  label={data.priority_category_2}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              {data?.priority_category_3 && (
                <Chip
                  label={data.priority_category_3}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              <br />
              <br />
              <Typography component="p">{displayBio(data?.bio)}</Typography>
            </Box>

            <Box
              width="50%"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data?.country && (
                <Box
                  component="img"
                  src={`/flags/${
                    countryShorthands[
                      data?.country as keyof typeof countryShorthands
                    ]
                  }.svg`}
                  width={150}
                  height={150}
                />
              )}
            </Box>
          </Box>
          <Stack
            spacing={1}
            direction="row"
          >
            <Button onClick={() => navigate("/settings")}>settings</Button>
          </Stack>
        </>
      )}
    </Box>
  )
}

export default UserProfile
