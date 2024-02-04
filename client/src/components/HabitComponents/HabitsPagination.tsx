import { Pagination } from "@mui/material"
import { HabitTypes } from "../../Types"
import { useNavigate } from "react-router-dom"

const HabitsPagination = ({
  allFilteredHabits,
  setPage,
  page,
}: {
  allFilteredHabits: HabitTypes[]
  setPage: (page: string) => void
  page: string | undefined
}) => {
  const navigate = useNavigate()

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
