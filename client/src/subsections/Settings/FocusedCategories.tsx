import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import { FocusedCategoriesDialog } from "../../components/SettingsComponents"
import { RootState } from "../../Store"
import { useSelector } from "react-redux"

const FocusedCategories = () => {
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const user = useSelector((state: RootState) => state.session.user)

  return (
    <Box
      sx={{ mb: 3 }}
      component="section"
    >
      <Typography variant="h3">Focused Categories</Typography>
      <Button
        startIcon={<EditIcon />}
        onClick={() => setIsCategoryDialogOpen(true)}
      >
        change
      </Button>
      {isUpdating && <CircularProgress size={15} />}
      <Typography>
        Current:{" "}
        {user?.priority_category_1 &&
          `${user?.priority_category_1}${
            user?.priority_category_2 || user.priority_category_3 ? ", " : ""
          }`}
        {user?.priority_category_2 &&
          `${user.priority_category_2}${user?.priority_category_3 ? ", " : ""}`}
        {user?.priority_category_3 && user?.priority_category_3}
        {!user?.priority_category_1 &&
          !user?.priority_category_2 &&
          !user?.priority_category_3 &&
          "None"}
      </Typography>
      <FocusedCategoriesDialog
        isCategoryDialogOpen={isCategoryDialogOpen}
        setIsCategoryDialogOpen={setIsCategoryDialogOpen}
        setIsUpdating={setIsUpdating}
      />
    </Box>
  )
}

export default FocusedCategories
