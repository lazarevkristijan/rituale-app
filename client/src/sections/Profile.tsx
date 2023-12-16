import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import Avatar from "@mui/material/Avatar"
import { deepPurple } from "@mui/material/colors"
import SettingsIcon from "@mui/icons-material/Settings"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  addCategory,
  logout,
  removeCategory,
} from "../features/session/sessionSlice"
import LogoutIcon from "@mui/icons-material/Logout"
import { RootState } from "../Store"
import { useEffect, useState } from "react"
import axios from "axios"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import { changeColorTheme } from "../features/settings/settingsSlice"
import { useQuery } from "react-query"
import { CategoryTypes } from "../Types"
import EditIcon from "@mui/icons-material/Edit"
import { countryShorthands } from "../constants"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.session.user)
  const completedHabits = useSelector(
    (state: RootState) => state.completedHabits
  )
  const darkTheme = useSelector((state: RootState) => state.settings.colorTheme)

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  useEffect(() => {
    !user ? navigate("/login") : setIsLoading(false)
  }, [navigate, user])

  const [isLoading, setIsLoading] = useState(true)

  const handleLogout = async () => {
    await axios
      .get("http://localhost:5432/logout", { withCredentials: true })
      .then(() => {
        dispatch(logout())
        dispatch(clearHabits())
        dispatch(changeColorTheme("light"))
        navigate("/")
      })
      .catch((err) => console.error("Error logging out: ", err))
  }

  const getHabitCategories = async () => {
    const res = await axios.get("http://localhost:5432/habit-categories")
    return res.data
  }
  const { data: habitCategoriesData } = useQuery(
    "habit categories",
    getHabitCategories
  )

  const handleChangePriorityCategory = async (
    newCategory: string,
    newCategoryId: number
  ) => {
    const categoryData = {
      cat1: user?.priority_category_1,
      cat2: user?.priority_category_2,
      cat3: user?.priority_category_3,
      userId: user?.id,
      catToChange: newCategory,
      idCatToChange: newCategoryId,
    }

    if (
      categoryData.cat1 === categoryData.catToChange ||
      categoryData.cat2 === categoryData.catToChange ||
      categoryData.cat3 === categoryData.catToChange
    ) {
      await axios.patch(
        `http://localhost:5432/remove-priority-category`,
        JSON.stringify(
          categoryData.cat1 === categoryData.catToChange
            ? { category_1: categoryData.cat1 }
            : categoryData.cat2 === categoryData.catToChange
            ? { category_2: categoryData.cat2 }
            : categoryData.cat3 === categoryData.catToChange
            ? { category_3: categoryData.cat3 }
            : ""
        ),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
    } else {
      if (categoryData.cat1 && categoryData.cat2 && categoryData.cat3) {
        return
      }
      await axios.patch(
        `http://localhost:5432/add-priority-category`,
        JSON.stringify(categoryData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
    }
  }

  return (
    <Box>
      {isLoading ? (
        <Typography component="h1">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h3">{user?.first_name}'s Profile</Typography>
          <Box
            sx={{
              bgcolor: `primary.${darkTheme ? "dark" : "light"}`,
              borderRadius: 1,
              p: 1,
              mb: 2,
              display: "flex",
            }}
          >
            <Box width="50%">
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {user?.first_name.charAt(0)}
                  {user?.last_name.charAt(0)}
                </Avatar>
                <Typography
                  sx={{ alignSelf: "center", ml: 1, display: "flex" }}
                >
                  {user?.first_name} <br />
                  {user?.last_name} <br />
                  {user?.email} <br />
                  {user?.country || "NO COUNTRY"}
                </Typography>
                <Tooltip
                  title="User No."
                  placement="bottom"
                  arrow
                  sx={{ ml: 1 }}
                >
                  <Chip
                    label={`#${user?.id}`}
                    color="primary"
                    component="span"
                  />
                </Tooltip>
              </Box>
              <Typography>
                Good Habits:{" "}
                <Typography component="span">
                  {completedHabits.habits.length}
                </Typography>
              </Typography>
              <Typography>
                Main Goals:{" "}
                <Typography component="span">
                  {user?.priority_category_1 && (
                    <Chip
                      label={user.priority_category_1}
                      color="primary"
                      component="span"
                      sx={{ ml: 1 }}
                    />
                  )}
                  {user?.priority_category_2 && (
                    <Chip
                      label={user.priority_category_2}
                      color="primary"
                      component="span"
                      sx={{ ml: 1 }}
                    />
                  )}
                  {user?.priority_category_3 && (
                    <Chip
                      label={user.priority_category_3}
                      color="primary"
                      component="span"
                      sx={{ ml: 1 }}
                    />
                  )}
                  <Chip
                    label="Edit"
                    icon={<EditIcon />}
                    color="warning"
                    component="span"
                    onClick={() => setIsCategoryDialogOpen(true)}
                  />
                  <Dialog
                    open={isCategoryDialogOpen}
                    onClose={() => setIsCategoryDialogOpen(false)}
                    aria-labelledby="priority category selection dialog"
                  >
                    <DialogTitle>Select priorty categories</DialogTitle>
                    <DialogContent>
                      <Typography variant="caption">
                        Select a maximum of 3 categories you're focusing on
                      </Typography>
                      <FormGroup>
                        {habitCategoriesData?.map(
                          (category: CategoryTypes, index: number) => (
                            <Box key={index}>
                              <FormControlLabel
                                label={category.category}
                                control={
                                  <Checkbox
                                    checked={
                                      user?.priority_category_1 ===
                                        category.category ||
                                      user?.priority_category_2 ===
                                        category.category ||
                                      user?.priority_category_3 ===
                                        category.category
                                    }
                                  />
                                }
                                onChange={() => {
                                  handleChangePriorityCategory(
                                    category.category,
                                    category.id
                                  )
                                  if (
                                    user?.priority_category_1 ===
                                      category.category ||
                                    user?.priority_category_2 ===
                                      category.category ||
                                    user?.priority_category_3 ===
                                      category.category
                                  ) {
                                    dispatch(
                                      removeCategory(
                                        user?.priority_category_1 ===
                                          category.category
                                          ? { category_1: category.category }
                                          : user?.priority_category_2 ===
                                            category.category
                                          ? { category_2: category.category }
                                          : user.priority_category_3 ===
                                            category.category
                                          ? { category_3: category.category }
                                          : ""
                                      )
                                    )
                                  } else {
                                    dispatch(addCategory(category.category))
                                  }
                                }}
                              />
                              {index !== habitCategoriesData.length - 1 && (
                                <Divider />
                              )}
                            </Box>
                          )
                        )}
                      </FormGroup>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        sx={{ width: "100%" }}
                        onClick={() => setIsCategoryDialogOpen(false)}
                      >
                        close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Typography>
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
              <Box
                component="img"
                src={`/flags/${
                  countryShorthands[
                    user?.country as keyof typeof countryShorthands
                  ]
                }.svg`}
                width={150}
                height={150}
              />
            </Box>
          </Box>
          <Stack
            spacing={1}
            direction="row"
          >
            <Button
              endIcon={<SettingsIcon />}
              onClick={() => navigate("/settings")}
            >
              settings
            </Button>
            <Button
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              logout
            </Button>
          </Stack>
        </>
      )}
    </Box>
  )
}

export default Profile
