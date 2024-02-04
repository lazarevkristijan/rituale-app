import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  Button,
  Divider,
  Typography,
} from "@mui/material"

import {
  FilterCategoriesTypes,
  FilterDialogTypes,
  FilterDifficultyTypes,
  FilterStatusTypes,
} from "../../Types"
import { useNavigate } from "react-router-dom"
import { FilterHabitCheckbox } from "./"
import { handleFilterChange, resetPage } from "../../Utils/HabitsUtils"

const FilterDialogs = ({
  isCategoryFilterOpen,
  setIsCategoryFilterOpen,
  filterCategories,
  setFilterCategories,
  isDifficultyFilterOpen,
  setIsDifficultyFilterOpen,
  filterDifficulties,
  setFilterDifficulties,
  isStatusFilterOpen,
  setIsStatusFilterOpen,
  filterStatus,
  setFilterStatus,
  setPage,
}: FilterDialogTypes) => {
  const navigate = useNavigate()

  return (
    <>
      <Dialog
        open={isCategoryFilterOpen}
        onClose={() => setIsCategoryFilterOpen(false)}
        aria-labelledby="category filter dialog"
      >
        <DialogTitle>Filter categories</DialogTitle>
        <DialogContent>
          <FormGroup>
            {Object.entries(filterCategories).map(([key, value], index) => (
              <React.Fragment key={key}>
                <FilterHabitCheckbox
                  label={key}
                  checked={value}
                  onChange={() => {
                    resetPage(navigate, setPage)

                    handleFilterChange(
                      key as keyof FilterCategoriesTypes,
                      setFilterCategories
                    )
                  }}
                />
                {index !== Object.entries(filterCategories).length - 1 && (
                  <Divider />
                )}
              </React.Fragment>
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCategoryFilterOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDifficultyFilterOpen}
        onClose={() => setIsDifficultyFilterOpen(false)}
        aria-labelledby="difficulty filter dialog"
      >
        <DialogTitle>Filter difficulties</DialogTitle>
        <DialogContent>
          {Object.entries(filterDifficulties).map(([key, value], index) => (
            <React.Fragment key={key}>
              <FilterHabitCheckbox
                label={key}
                checked={value}
                onChange={() => {
                  resetPage(navigate, setPage)

                  handleFilterChange(
                    key as keyof FilterDifficultyTypes,
                    setFilterDifficulties
                  )
                }}
              />
              {index !== Object.entries(filterDifficulties).length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDifficultyFilterOpen(false)}>
            close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isStatusFilterOpen}
        onClose={() => setIsStatusFilterOpen(false)}
        aria-labelledby="status filter dialog"
      >
        <DialogTitle>Filter statuses</DialogTitle>
        <DialogContent>
          <FormGroup>
            {Object.entries(filterStatus).map(([key, value], index) => {
              return (
                <React.Fragment key={key}>
                  <FilterHabitCheckbox
                    label={key.replace("_", " ")}
                    checked={value}
                    onChange={() => {
                      localStorage.setItem(key, JSON.stringify(!value))

                      resetPage(navigate, setPage)

                      handleFilterChange(
                        key as keyof FilterStatusTypes,
                        setFilterStatus
                      )
                    }}
                  />
                  {index !== Object.entries(filterStatus).length && <Divider />}
                </React.Fragment>
              )
            })}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsStatusFilterOpen(false)}>close</Button>
        </DialogActions>
      </Dialog>
      <Typography>
        {!filterCategories.health ||
        !filterCategories.appearance ||
        !filterCategories.communication ||
        !filterCategories.finance ||
        !filterCategories.productivity ||
        !filterCategories.creativity ||
        !filterCategories.networking ||
        !filterCategories.relationships ||
        !filterCategories.personal_growth
          ? "Currently excluding categories: "
          : ""}
        {!filterCategories.health && "Health, "}
        {!filterCategories.appearance && "Appearance, "}
        {!filterCategories.communication && "Communication, "}
        {!filterCategories.finance && "Finance,  "}
        {!filterCategories.productivity && "Productivity, "}
        {!filterCategories.creativity && "Creativity, "}
        {!filterCategories.networking && "Networking, "}
        {!filterCategories.relationships && "Relationships, "}
        {!filterCategories.personal_growth && "Personal growth"}
      </Typography>
      <Typography>
        {!filterDifficulties.easy ||
        !filterDifficulties.medium ||
        !filterDifficulties.hard
          ? "Currently excluding difficulties: "
          : ""}
        {!filterDifficulties.easy && "Easy, "}
        {!filterDifficulties.medium && "Medium, "}
        {!filterDifficulties.hard && "Hard"}
      </Typography>
      <Typography>
        {!filterStatus.completed || !filterStatus.not_completed
          ? "Currently excluding status: "
          : ""}
        {!filterStatus.completed && "Completed, "}
        {!filterStatus.not_completed && "Not completed"}
      </Typography>
    </>
  )
}

export default FilterDialogs
