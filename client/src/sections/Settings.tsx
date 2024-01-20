import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import { addCategory, removeCategory } from "../features/session/sessionSlice"
import React, { useEffect, useState } from "react"
import { nameRegex, usernameRegex } from "../Regex"
import { allCountries, countryShorthands } from "../constants"
import EditIcon from "@mui/icons-material/Edit"
import { CategoryTypes } from "../Types"
import { useQuery } from "react-query"
import SaveIcon from "@mui/icons-material/Save"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import {
  getHabitCategories,
  handleChangePriorityCategory,
  handleCountryChange,
  handleThemeChange,
  handleUserDataChange,
  handleUserDelete,
} from "../Utils/SettingsUtils"
import SettingsLegalInfo from "../subsections/Settings/SettingsLegalInfo"
import ProfilePicture from "../subsections/Settings/ProfilePicture"
import Bio from "../subsections/Settings/Bio"

const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(changeNavbarLocation(4))
  }, [dispatch])

  const { logout: auth0logout, isAuthenticated: auth0authenticated } =
    useAuth0()

  useEffect(() => {
    !auth0authenticated && navigate("/")
  }, [auth0authenticated, navigate])

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  const [userData, setUserData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    username: user?.username || "",
  })

  const initialUserData = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    username: user?.username || "",
  }

  const [changedFields, setChangedFields] = useState({
    firstName: false,
    lastName: false,
    username: false,
  })

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const { data: habitCategoriesData } = useQuery(
    "habit categories",
    getHabitCategories
  )

  if (!user) return

  return (
    <Box>
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
      <br />
      <br />

      <SettingsLegalInfo />

      <ProfilePicture />
      <br />
      <Bio />
      <br />

      <Box>
        <Button
          startIcon={<EditIcon />}
          onClick={() => setIsCategoryDialogOpen(true)}
        >
          focused categories
        </Button>
        <Typography>
          Current focused categories:{" "}
          {user?.priority_category_1 && user.priority_category_1 + ", "}
          {user?.priority_category_2 && user.priority_category_2 + ", "}
          {user?.priority_category_3 && user?.priority_category_3}
          {!user?.priority_category_1 &&
            !user?.priority_category_2 &&
            !user?.priority_category_3 &&
            "None"}
        </Typography>
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
                  <React.Fragment key={index}>
                    <FormControlLabel
                      label={category.category}
                      control={
                        <Checkbox
                          checked={
                            user?.priority_category_1 === category.category ||
                            user?.priority_category_2 === category.category ||
                            user?.priority_category_3 === category.category
                          }
                        />
                      }
                      onChange={() => {
                        handleChangePriorityCategory(
                          category.category,
                          category.id,
                          user
                        )
                        if (
                          user?.priority_category_1 === category.category ||
                          user?.priority_category_2 === category.category ||
                          user?.priority_category_3 === category.category
                        ) {
                          dispatch(
                            removeCategory(
                              user?.priority_category_1 === category.category
                                ? { category_1: category.category }
                                : user?.priority_category_2 ===
                                  category.category
                                ? { category_2: category.category }
                                : user.priority_category_3 === category.category
                                ? { category_3: category.category }
                                : ""
                            )
                          )
                        } else {
                          dispatch(addCategory(category.category))
                        }
                      }}
                    />
                    {index !== habitCategoriesData.length - 1 && <Divider />}
                  </React.Fragment>
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
      </Box>
      <FormGroup sx={{ display: "block" }}>
        <FormControlLabel
          control={<Switch />}
          checked={colorTheme === "dark"}
          label="Dark Mode"
          labelPlacement="start"
          onChange={() => handleThemeChange(colorTheme, dispatch)}
        />
      </FormGroup>

      <br />

      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={user?.country || ""}
          onChange={(e) => handleCountryChange(e, dispatch)}
        >
          <MenuItem value="">SELECT</MenuItem>
          {allCountries.map((country: string, index) => (
            <MenuItem
              key={index}
              value={country}
            >
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>
        Current country: {user?.country || "None"}{" "}
        {user?.country && (
          <Box
            component="img"
            src={`/flags/${
              countryShorthands[user?.country as keyof typeof countryShorthands]
            }.svg`}
            width={20}
            height={20}
            sx={{ verticalAlign: "middle" }}
          />
        )}
      </Typography>

      <br />

      <form onSubmit={(e) => handleUserDataChange(e, userData, dispatch, user)}>
        <Typography
          component="h3"
          sx={{ fontSize: 35 }}
        >
          Change credentials
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexDirection: "row" }}>
            <TextField
              label="First Name"
              sx={{ mb: 1 }}
              value={userData.firstName}
              onChange={(e) => {
                if (!changedFields.firstName) {
                  setChangedFields({ ...changedFields, firstName: true })
                }
                const capitalizedFirstName =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1).toLowerCase()

                setUserData({ ...userData, firstName: capitalizedFirstName })
              }}
              error={
                !nameRegex.test(userData.firstName) && changedFields.firstName
              }
            />
            <TextField
              label="Last Name"
              value={userData.lastName}
              sx={{ mb: 1 }}
              onChange={(e) => {
                if (!changedFields.lastName) {
                  setChangedFields({ ...changedFields, lastName: true })
                }
                const capitalizedLastName =
                  e.target.value.charAt(0).toUpperCase() +
                  e.target.value.slice(1).toLowerCase()

                setUserData({ ...userData, lastName: capitalizedLastName })
              }}
              error={
                !nameRegex.test(userData.lastName) && changedFields.lastName
              }
            />
            <TextField
              label="Username"
              value={userData.username}
              sx={{ mb: 1 }}
              onChange={(e) => {
                if (!changedFields.username) {
                  setChangedFields({ ...changedFields, username: true })
                }
                setUserData({ ...userData, username: e.target.value })
              }}
              error={
                (userData.username.length < 2 ||
                  userData.username.length > 50) &&
                changedFields.username
              }
              helperText="Limit 1 - 50 characters"
            />
          </Box>
        </Box>
        <Button
          type="submit"
          disabled={
            (!nameRegex.test(userData.firstName) ||
              userData.firstName === initialUserData.firstName) &&
            (!nameRegex.test(userData.lastName) ||
              userData.lastName === initialUserData.lastName) &&
            (!usernameRegex.test(userData.username) ||
              userData.username === initialUserData.username)
          }
          startIcon={<SaveIcon />}
        >
          save changes
        </Button>
      </form>
      <br />
      <br />

      <Typography
        component="h3"
        sx={{ color: "red", fontWeight: "bold", fontSize: 35 }}
      >
        Danger Zone
      </Typography>
      <Button
        onDoubleClick={() =>
          handleUserDelete(user?.profile_picture, dispatch, auth0logout)
        }
      >
        delete profile
      </Button>
    </Box>
  )
}

export default Settings
