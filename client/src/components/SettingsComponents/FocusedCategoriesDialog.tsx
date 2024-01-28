import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material"
import {
  getHabitCategories,
  handleChangePriorityCategory,
} from "../../Utils/SettingsUtils"
import { useQuery } from "react-query"
import React from "react"
import { CategoryTypes } from "../../Types"
import {
  addCategory,
  removeCategory,
} from "../../features/session/sessionSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"

const FocusedCategoriesDialog = ({
  isCategoryDialogOpen,
  setIsCategoryDialogOpen,
  setIsUpdating,
}: {
  isCategoryDialogOpen: boolean
  setIsCategoryDialogOpen: (value: React.SetStateAction<boolean>) => void
  setIsUpdating: (value: React.SetStateAction<boolean>) => void
}) => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.session.user)

  const { data: habitCategoriesData } = useQuery(
    "habit categories",
    getHabitCategories
  )

  if (!user) return

  return (
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
                  onChange={async () => {
                    setIsUpdating(true)

                    await handleChangePriorityCategory(
                      category.category,
                      category.id,
                      user
                    ).then((response) => {
                      if (response === "success") {
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
                        setIsUpdating(false)
                      }
                    })
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
  )
}

export default FocusedCategoriesDialog
