import { Box, Chip, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import StarIcon from "@mui/icons-material/Star"
import { useState } from "react"
import PushPinIcon from "@mui/icons-material/PushPin"
import HabitToggleButton from "./HabitToggleButton"
import { handlePinHabit } from "../../Utils/HabitsUtils"
import { changePinnedHabit } from "../../features/session/sessionSlice"
import { HabitTypes } from "../../Types"

const HabitCard = ({
  habit,
  setHabitToToggle,
}: {
  habit: HabitTypes
  setHabitToToggle: (value: React.SetStateAction<number>) => void
}) => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits.habits
  )

  const [pinnedHabitIdShown, setPinnedHabitIdShown] = useState<number | null>(
    null
  )

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        position: "relative",
      }}
      onMouseOver={() => {
        if (!user) return
        setPinnedHabitIdShown(habit.id)
      }}
      onMouseLeave={() => {
        if (!user) return
        setPinnedHabitIdShown(null)
      }}
    >
      {user?.pinned_habit === habit.id && (
        <StarIcon
          sx={{
            color: "black",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      )}
      <Box
        sx={{
          bgcolor:
            user?.pinned_habit === habit.id
              ? "yellow"
              : habit.difficulty === "Easy"
              ? `success.${colorTheme}`
              : habit.difficulty === "Medium"
              ? `warning.${colorTheme}`
              : `error.${colorTheme}`,
          color: "#000",
          width: 300,
          borderRadius: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{habit.description}</Typography>
          <Box sx={{ height: 50 }}>
            <Chip
              label={habit.difficulty}
              sx={{
                bgcolor:
                  user?.pinned_habit === habit.id
                    ? "#000"
                    : habit.difficulty === "Easy"
                    ? `success`
                    : habit.difficulty === "Medium"
                    ? `warning`
                    : `error`,
              }}
            />
          </Box>
          <Grid
            gap={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Chip
              label={habit.category_1}
              color="primary"
              sx={{ fontSize: 16 }}
            />
            {habit.category_2 && (
              <Chip
                label={habit.category_2}
                color="primary"
                sx={{ fontSize: 16 }}
              />
            )}
            {habit.category_3 && (
              <Chip
                label={habit.category_3}
                color="primary"
                sx={{ fontSize: 16 }}
              />
            )}
          </Grid>
        </Box>
        {pinnedHabitIdShown === habit.id && (
          <Tooltip
            title={user?.pinned_habit === habit.id ? "Unpin" : "Pin"}
            arrow
          >
            <IconButton
              sx={{
                position: "absolute",
                right: 5,
                bottom: 45,
              }}
              onClick={() => {
                if (user?.pinned_habit === habit.id) {
                  handlePinHabit(null)
                  dispatch(changePinnedHabit(null))
                } else {
                  handlePinHabit(habit.id)
                  dispatch(changePinnedHabit(habit.id))
                }
              }}
            >
              <PushPinIcon
                sx={{
                  color: "black",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
        <HabitToggleButton
          completedHabits={completedHabits}
          habitId={habit.id}
          setHabitToToggle={setHabitToToggle}
        />
      </Box>
    </Box>
  )
}

export default HabitCard
