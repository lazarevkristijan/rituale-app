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
  List,
  Link,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
  Stack,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../Store"
import {
  changeColorTheme,
  changeLanguage,
} from "../features/settings/settingsSlice"
import axios from "axios"
import {
  addCategory,
  changeBio,
  changeCountry,
  changeProfilePicture,
  login,
  removeCategory,
} from "../features/session/sessionSlice"
import { clearHabits } from "../features/completedHabits/completedHabitsSlice"
import React, { useEffect, useState } from "react"
import { nameRegex, usernameRegex } from "../Regex"
import {
  allCountries,
  countryShorthands,
  defaultPfpURL,
  languages,
} from "../constants"
import EditIcon from "@mui/icons-material/Edit"
import { CategoryTypes } from "../Types"
import { useQuery } from "react-query"
import SaveIcon from "@mui/icons-material/Save"
import { changeNavbarLocation } from "../features/bottomNav/bottomNavSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { getPfpLink, handlePfpDelete } from "../Utils/SettingsUtils"

const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(changeNavbarLocation(4))
  }, [dispatch])

  const { logout: auth0logout, isAuthenticated: auth0authenticated } =
    useAuth0()

  useEffect(() => {
    auth0authenticated ? console.log("authenticated") : navigate("/")
  }, [auth0authenticated, navigate])

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
        if (response.data.theme === "dark") {
          document.body.style.backgroundColor = "#121212"
        } else {
          document.body.style.backgroundColor = "#fff"
        }
      })
  }

  const handleUserDelete = async () => {
    if (user?.profile_picture) {
      await handlePfpDelete(user?.profile_picture, dispatch)
    }

    await axios
      .delete(`http://localhost:5432/delete-user`, { withCredentials: true })
      .then(() => {
        dispatch(changeColorTheme("light"))
        document.body.style.backgroundColor = "#fff"
        dispatch(changeLanguage("en"))

        dispatch(clearHabits())
        auth0logout()
      })
  }

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

  const handleCountryChange = (e: SelectChangeEvent) => {
    if (!e.target.value) {
      return console.error("e target is empty")
    }
    axios
      .patch(
        `http://localhost:5432/user-settings/change-country`,
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
        `http://localhost:5432/user-settings/change-bio`,
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
    const res = await axios.get("http://localhost:5432/all-habit-categories")
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
  const handleProfilePictureChange = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (user?.profile_picture) {
      handlePfpDelete(user.profile_picture, dispatch)
    }

    if (profilePicture) {
      const formData = new FormData()
      formData.append("profilePicture", profilePicture)
      axios
        .patch(
          `http://localhost:5432/user-settings/change-profile-picture`,
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
      setPfpURL(getPfpLink(user?.profile_picture))
    }
  }, [user?.profile_picture])

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

      <Stack
        sx={{ position: "fixed", bottom: 50, right: 20, textAlign: "center" }}
        direction="column"
      >
        <Link
          href="https://buy.stripe.com/eVa28w2K9bRM65i4gh"
          target="_blank"
          underline="hover"
        >
          <Button>donate</Button>
        </Link>
        <Link
          href="https://www.termsfeed.com/live/67488f52-ba8a-4438-bd5d-f9fc93cbbae6"
          target="_blank"
          underline="hover"
        >
          Privacy Policy
        </Link>
        <Link
          href="https://www.termsandconditionsgenerator.com/live.php?token=R3tNAWErbhtEm3XDOzzsmD8SX1H77NVR"
          target="_blank"
          underline="hover"
        >
          Terms and Conditions
        </Link>
      </Stack>

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
              background: `url('${
                user?.profile_picture ? pfpURL : defaultPfpURL
              }') no-repeat center/cover #fff`,
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
              id="pfpInput"
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
                "pfpInput"
              ) as HTMLInputElement
              inputEl.value = ""
              setProfilePicture(null)

              if (user?.profile_picture) {
                setPfpURL(getPfpLink(user.profile_picture))
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
        <Button
          onClick={() =>
            handlePfpDelete(user?.profile_picture || defaultPfpURL, dispatch)
          }
          disabled={!user?.profile_picture}
        >
          delete pfp
        </Button>
      </Box>
      <br />

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
              <React.Fragment key={index}>
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
              </React.Fragment>
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
      <Button onDoubleClick={handleUserDelete}>delete profile</Button>
    </Box>
  )
}

export default Settings
