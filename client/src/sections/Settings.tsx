import {
  Box,
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
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import {
  changeColorTheme,
  changeLanguage,
} from "../features/settings/settingsSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {
  addCategory,
  changeBio,
  changeCountry,
  changeProfilePicture,
  login,
  logout,
  removeCategory,
} from "../features/session/sessionSlice"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import { useEffect, useState } from "react"
import { emailRegex, nameRegex, passwordRegex } from "../Regex"
import { allCountries, countryShorthands, languages } from "../constants"
import EditIcon from "@mui/icons-material/Edit"
import { CategoryTypes } from "../Types"
import { useQuery } from "react-query"
import SaveIcon from "@mui/icons-material/Save"
import { changeLocation } from "../features/bottomNav/bottomNavSlice"

const Settings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  dispatch(changeLocation(4))

  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )
  const language = useSelector((state: RootState) => state.settings.language)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleThemeChange = () => {
    axios
      .patch(
        `http://localhost:5432/user-settings/change-theme`,
        JSON.stringify({ theme: colorTheme === "dark" ? "light" : "dark" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(changeColorTheme(response.data.theme))
      })
  }

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:5432/delete-user`, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logout())
        dispatch(clearHabits())
        navigate("/login")
      })
  }

  const [userData, setUserData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const initialUserData = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  }

  const handleUserDataChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios
      .patch(
        `http://localhost:5432/user-settings/change-creds`,
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(login({ ...user, ...response.data }))
      })
  }

  const handleLanguageChange = (lang: string) => {
    axios.patch(
      `http://localhost:5432/user-settings/change-language`,
      JSON.stringify({ language: lang }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
  }

  const [changedFields, setChangedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  })
  const handleCountryChange = (e: SelectChangeEvent) => {
    if (!e.target.value) {
      return console.error("e target is empty")
    }
    axios
      .patch(
        "http://localhost:5432/user-settings/change-country",
        JSON.stringify({ country: e.target.value }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(changeCountry(e.target.value))
      })
  }

  const [bio, setBio] = useState(user?.bio || "")
  const initialBioValue = user?.bio || ""
  const [isBioChanged, setIsBioChanged] = useState(false)

  const handleBioChange = () => {
    axios
      .patch(
        "http://localhost:5432/user-settings/change-bio",
        JSON.stringify({ bio: bio }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(changeBio(bio))
        setIsBioChanged(false)
      })
  }

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
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

  const [profilePicture, setProfilePicture] = useState<File | null>(null)

  const handleProfilePictureChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (profilePicture) {
      const formData = new FormData()
      formData.append("profilePicture", profilePicture)
      axios
        .patch(
          "http://localhost:5432/user-settings/change-profile-picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(changeProfilePicture(res.data))
        })
    } else {
      console.error("no file selected")
    }
    setProfilePicture(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file !== undefined && file !== null) {
      setProfilePicture(file)
    }
  }
  const [pfpURL, setPfpURL] = useState("")
  useEffect(() => {
    if (user?.profile_picture) {
      const pfpData = JSON.parse(user?.profile_picture)
      setPfpURL(pfpData.url)
    }
  }, [user?.profile_picture])

  return (
    <Box>
      <Typography
        component="h2"
        sx={{ fontSize: 50 }}
      >
        {user?.first_name}'s settings
      </Typography>
      <Typography variant="caption">
        Settings that don't have a "SAVE CHANGES" button are auto saved
      </Typography>

      <br />
      <br />

      <Box>
        <Typography>Profile picture</Typography>
        <form
          onSubmit={(e) => handleProfilePictureChange(e)}
          encType="multipart/form-data"
        >
          <Box
            width={100}
            height={100}
            borderRadius={20}
            sx={{
              background: `url('${pfpURL}') no-repeat center/cover #fff`,
              width: 100,
              height: 100,
              borderRadius: 20,
              border: "3px solid black",
              position: "relative",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <input
              type="file"
              id="test123"
              name="profilePicture"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                if (e.target.files) {
                  if (
                    e.target.files[0].type !== "image/png" &&
                    e.target.files[0].type !== "image/jpeg" &&
                    e.target.files[0].type !== "image/jpg"
                  ) {
                    return console.error("File is not from supported types")
                  } else if (e.target.files[0].size > 5 * 1048576) {
                    return console.error("File is above 5mb")
                  } else {
                    const reader = new FileReader()
                    reader.onload = (readerEvent) => {
                      if (readerEvent.target) {
                        const url = readerEvent.target.result
                        if (url) {
                          setPfpURL(url as string)
                        }
                      }
                    }
                    if (e.target.files) {
                      reader.readAsDataURL(e.target.files[0])
                    }
                    handleFileChange(e)
                  }
                } else {
                  return console.error("Error when uploading file")
                }
              }}
              style={{
                opacity: 0,
                width: "100%",
                height: 150,
                bottom: 0,
                backgroundColor: "#555",
                cursor: "pointer",
                position: "absolute",
                borderRadius: 50,
              }}
            />
          </Box>
          <Typography variant="caption">Max 5mb</Typography>
          <br />
          <Button
            disabled={!profilePicture}
            onClick={() => {
              const inputEl = document.getElementById(
                "test123"
              ) as HTMLInputElement
              inputEl.value = ""
              setProfilePicture(null)

              if (user?.profile_picture) {
                const pfpData = JSON.parse(user?.profile_picture)
                setPfpURL(pfpData.url)
              }
            }}
          >
            reset
          </Button>
          <Button
            type="submit"
            disabled={!profilePicture}
          >
            submit
          </Button>
        </form>
      </Box>
      <br />

      <Box>
        <Typography>Bio</Typography>
        <Box sx={{ position: "relative", width: "fit-content" }}>
          <textarea
            style={{
              resize: "none",
              padding: 10,
              paddingRight: 75,
            }}
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
          onClick={handleBioChange}
          disabled={!isBioChanged}
          startIcon={<SaveIcon />}
        >
          save changes
        </Button>
      </Box>
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
                  <Box key={index}>
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
                          category.id
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
      </Box>
      <Button
        startIcon={<EditIcon />}
        onClick={() => setIsDialogOpen(true)}
      >
        change language
      </Button>
      <Typography>
        Current interface language:{" "}
        {language === "en"
          ? "English"
          : language === "es"
          ? "Spanish"
          : language === "it"
          ? "Italian"
          : language === "de"
          ? "German"
          : "French"}{" "}
        <Box
          component="img"
          src={`/flags/${language}.svg`}
          width={20}
          height={20}
          sx={{ display: "inline", verticalAlign: "middle" }}
        />
      </Typography>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="langauge dialog"
      >
        <DialogTitle>Change Language</DialogTitle>
        <DialogContent>
          <List>
            {languages.map((lang, index) => (
              <Box key={index}>
                <ListItemButton
                  selected={lang.shortHand === language}
                  onClick={() => {
                    dispatch(changeLanguage(lang.shortHand))
                    handleLanguageChange(lang.shortHand)
                  }}
                >
                  <ListItemText primary={lang.fullName} />
                </ListItemButton>
                {index !== 4 ? <Divider /> : ""}
              </Box>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <FormGroup sx={{ display: "block" }}>
        <FormControlLabel
          control={<Switch />}
          checked={colorTheme === "dark"}
          label="Dark Mode"
          labelPlacement="start"
          onChange={handleThemeChange}
        />
      </FormGroup>

      <br />

      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={user?.country || ""}
          onChange={handleCountryChange}
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

      <form onSubmit={(e) => handleUserDataChange(e)}>
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
              error={!nameRegex.test(userData.firstName)}
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
              error={!nameRegex.test(userData.lastName)}
            />
          </Box>
          <TextField
            label="Email"
            value={userData.email}
            sx={{ mb: 1 }}
            type="email"
            onChange={(e) => {
              if (!changedFields.email) {
                setChangedFields({ ...changedFields, email: true })
              }
              setUserData({ ...userData, email: e.target.value })
            }}
            error={!emailRegex.test(userData.email)}
          />
          <TextField
            label="Old password"
            value={userData.oldPassword}
            onChange={(e) => {
              if (!changedFields.oldPassword) {
                setChangedFields({ ...changedFields, oldPassword: true })
              }
              setUserData({ ...userData, oldPassword: e.target.value })
            }}
            helperText="Must be at least 8 characters long, have 1 lowercase, 1 uppercase letter and 1 number"
          />
          <TextField
            label="New password"
            value={userData.newPassword}
            onChange={(e) => {
              if (!changedFields.newPassword) {
                setChangedFields({ ...changedFields, newPassword: true })
              }
              setUserData({ ...userData, newPassword: e.target.value })
            }}
          />
          <TextField
            label="Confirm new password"
            value={userData.confirmNewPassword}
            onChange={(e) => {
              if (!changedFields.confirmNewPassword) {
                setChangedFields({ ...changedFields, confirmNewPassword: true })
              }
              setUserData({ ...userData, confirmNewPassword: e.target.value })
            }}
          />
        </Box>
        <Button
          type="submit"
          disabled={
            !nameRegex.test(userData.firstName) ||
            !nameRegex.test(userData.lastName) ||
            !emailRegex.test(userData.email) ||
            (!passwordRegex.test(userData.oldPassword) &&
              changedFields.oldPassword) ||
            (!passwordRegex.test(userData.newPassword) &&
              changedFields.newPassword) ||
            (!passwordRegex.test(userData.confirmNewPassword) &&
              changedFields.confirmNewPassword) ||
            userData.firstName === initialUserData.firstName ||
            userData.lastName === initialUserData.lastName ||
            userData.email === initialUserData.email ||
            userData.oldPassword === initialUserData.oldPassword ||
            userData.newPassword === initialUserData.newPassword ||
            userData.confirmNewPassword === initialUserData.confirmNewPassword
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
      <Button onDoubleClick={handleDeleteUser}>delete profile</Button>
    </Box>
  )
}

export default Settings
