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

  const [isSaving, setIsSaving] = useState(false)

  return (
    <Box>
      <Typography>Bio</Typography>
      <Typography variant="caption">Max 3 rows</Typography>
      <Box sx={{ position: "relative", width: "fit-content" }}>
        <textarea
          style={{
            resize: "none",
            padding: 10,
            paddingRight: 75,
          }}
          wrap="hard"
          rows={3}
          cols={40}
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
          handleBioChange(bio, dispatch, setIsBioChanged, setIsSaving)
        }
        disabled={!isBioChanged}
        startIcon={<SaveIcon />}
      >
        save changes
      </Button>
      {isSaving && <CircularProgress size={15} />}
    </Box>
  )
}

export default Bio
