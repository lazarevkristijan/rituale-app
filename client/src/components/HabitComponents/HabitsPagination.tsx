import { Pagination } from "@mui/material"
import { NavigateFunction } from "react-router-dom"
import { HabitTypes } from "../../Types"

const HabitsPagination = ({
  allFilteredHabits,
  setPage,
  page,
  navigate,
}: {
  allFilteredHabits: HabitTypes[]
  setPage: (page: string) => void
  page: string | undefined
  navigate: NavigateFunction
}) => {
  return (
    <Pagination
      count={Math.ceil(allFilteredHabits.length / 15)}
      onChange={(_e, value) => {
        setPage(String(value))
        navigate(`/habits/${value}`)
      }}
      page={Number(page)}
    />
  )
}

export default HabitsPagination
