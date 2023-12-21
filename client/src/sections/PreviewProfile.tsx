import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"
import {
  Box,
  Breadcrumbs,
  Chip,
  Link,
  Tooltip,
  Typography,
} from "@mui/material"
import { RootState } from "../Store"
import React from "react"
import { countryShorthands } from "../constants"
import { useQuery } from "react-query"
import { getPfpLink } from "../HelperFunctions/getPfpLink"
import { ProfileSkeleton } from "../components"

const PreviewProfile = () => {
  const dispatch = useDispatch()
  dispatch(changeLocation(1))

  const { id } = useParams()

  const darkTheme = useSelector((state: RootState) => state.settings.colorTheme)

  const getNewUser = async () => {
    const res = await axios.get(`http://localhost:5432/user/${id}`)
    return res.data
  }
  const { data: previewUser, isLoading } = useQuery(
    "preview-user-profile",
    getNewUser
  )

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

  return (
    <Box>
      {isLoading || isNewLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Typography variant="h3">
            {previewUser.first_name}'s Profile
          </Typography>
          <Breadcrumbs separator=">">
            <Link
              underline="hover"
              href="/search"
            >
              Search
            </Link>
            <Typography>Profile preview </Typography>
          </Breadcrumbs>
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
                    background: `url('${getPfpLink(
                      previewUser.profile_picture
                    )}') no-repeat center/cover #fff`,
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                    border: "3px solid black",
                  }}
                ></Box>
                <Typography
                  sx={{ alignSelf: "center", ml: 1, display: "flex" }}
                >
                  {previewUser.first_name} <br />
                  {previewUser.last_name} <br />
                  {previewUser.country || "NO COUNTRY"}
                </Typography>
                <Tooltip
                  title="User No."
                  placement="bottom"
                  arrow
                  sx={{ ml: 1 }}
                >
                  <Chip
                    label={`#${previewUser.id}`}
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
                {!previewUser.priority_category_1 &&
                  !previewUser.priority_category_2 &&
                  !previewUser.priority_category_3 &&
                  "None"}{" "}
              </Typography>
              {previewUser.priority_category_1 && (
                <Chip
                  label={previewUser.priority_category_1}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              {previewUser.priority_category_2 && (
                <Chip
                  label={previewUser.priority_category_2}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              {previewUser?.priority_category_3 && (
                <Chip
                  label={previewUser.priority_category_3}
                  color="primary"
                  component="span"
                  sx={{ ml: 1 }}
                />
              )}
              <br />
              <br />
              <Typography component="p">
                {displayBio(previewUser?.bio)}
              </Typography>
            </Box>

            <Box
              width="50%"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {previewUser?.country && (
                <Box
                  component="img"
                  src={`/flags/${
                    countryShorthands[
                      previewUser?.country as keyof typeof countryShorthands
                    ]
                  }.svg`}
                  width={150}
                  height={150}
                />
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default PreviewProfile
