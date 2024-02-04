import { Button } from "@mui/material"
import { handleBlogDelete } from "../../Utils/GeneralUtils"

export const BlogRemoveButton = ({ id }: { id: number }) => {
  return (
    <Button
      onClick={() => handleBlogDelete(id)}
      sx={{ width: "50%" }}
    >
      delete
    </Button>
  )
}

export default BlogRemoveButton
