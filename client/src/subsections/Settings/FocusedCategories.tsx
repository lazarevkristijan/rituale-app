import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import FocusedCategoriesDialog from "../../components/SettingsComponents/FocusedCategoriesDialog"
import { UserTypes } from "../../Types"

const FocusedCategories = ({ user }: { user: UserTypes }) => {
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
