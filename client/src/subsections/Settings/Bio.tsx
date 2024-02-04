import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useState } from "react"
import { AppDispatch } from "../../Store"
import { handleBioChange } from "../../Utils/SettingsUtils"
import SaveIcon from "@mui/icons-material/Save"
import { UserTypes } from "../../Types"

const Bio = ({
  user,
  dispatch,
}: {
  user: UserTypes
  dispatch: AppDispatch
}) => {
  const [bio, setBio] = useState(user?.bio || "")
  const initialBioValue = user?.bio || ""
  const [isBioChanged, setIsBioChanged] = useState(false)

  const [isUpdating, setIsUpdating] = useState(false)

  return (
    <Box sx={{ mb: 2 }}>
      <Typography>Bio</Typography>
      <Typography variant="caption">Max 4 rows | 100 characters</Typography>
      <Box sx={{ position: "relative", width: "fit-content" }}>
        <textarea
          style={{
            resize: "none",
            padding: 10,
            paddingRight: 75,
          }}
          wrap="hard"
          rows={4}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value)
            if (!isBioChanged) {
              setIsBioChanged(true)
            }
            if (e.target.value === initialBioValue) {
              setIsBioChanged(false)
            }
          }}
          placeholder="Something about yourself..."
          maxLength={100}
        />
        <Typography
          component="span"
          sx={{ position: "absolute", bottom: 10, right: 10 }}
        >
          {bio.length}/100
        </Typography>
      </Box>

      <Button
        onClick={() =>
          handleBioChange(bio, dispatch, setIsBioChanged, setIsUpdating)
        }
        disabled={!isBioChanged}
        startIcon={<SaveIcon />}
      >
        save
      </Button>
      {isUpdating && <CircularProgress size={15} />}
    </Box>
  )
}

export default Bio
