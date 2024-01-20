import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import FocusedCategoriesDialog from "../../components/SettingsComponents/FocusedCategoriesDialog"

const FocusedCategories = () => {
  const user = useSelector((state: RootState) => state.session.user)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)

  return (
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
      <FocusedCategoriesDialog
        isCategoryDialogOpen={isCategoryDialogOpen}
        setIsCategoryDialogOpen={setIsCategoryDialogOpen}
      />
    </Box>
  )
}

export default FocusedCategories
