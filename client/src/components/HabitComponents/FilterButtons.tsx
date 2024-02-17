import { useNavigate } from "react-router-dom"
import { FilterButton } from "."
import { handleResetFilters, handleResetHabits } from "../../Utils/HabitsUtils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Store"
import { FilterButtonsTypes } from "../../Types"
import { Box } from "@mui/material"

const FilterButtons = ({
  setIsCategoryFilterOpen,
  setIsDifficultyFilterOpen,
  setIsStatusFilterOpen,
  setPage,
  setFilterCategories,
  setFilterDifficulties,
  setFilterStatus,
}: FilterButtonsTypes) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.session.user)

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        gap: 1,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <FilterButton
        label="category filters"
        onClick={() => setIsCategoryFilterOpen(true)}
      />
      <FilterButton
        label="difficulty filters"
        onClick={() => setIsDifficultyFilterOpen(true)}
      />
      <FilterButton
        label="status filters"
        onClick={() => setIsStatusFilterOpen(true)}
      />
      <FilterButton
        label="reset filters"
        onClick={() =>
          handleResetFilters(
            navigate,
            setPage,
            setFilterCategories,
            setFilterDifficulties,
            setFilterStatus
          )
        }
      />
      {user && (
        <FilterButton
          label="reset progress"
          onClick={() => handleResetHabits(dispatch)}
        />
      )}
    </Box>
  )
}

export default FilterButtons
