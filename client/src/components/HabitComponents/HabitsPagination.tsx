import { Box, Pagination } from "@mui/material"
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
    <Box component="section">
      <Pagination
        count={Math.ceil(allFilteredHabits.length / 15)}
        onChange={(_e, value) => {
          setPage(String(value))
          navigate(`/habits/${value}`)
        }}
        page={Number(page)}
      />
    </Box>
  )
}

export default HabitsPagination
