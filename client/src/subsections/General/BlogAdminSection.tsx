import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { useState } from "react"
import { handleAddBlog } from "../../Utils/GeneralUtils"
import { initialBlogData } from "../../constants"

export const BlogAdminSection = () => {
  const user = useSelector((state: RootState) => state.session.user)
  const [isAddBlogDialogOpen, setIsAddBlogDialogOpen] = useState(false)
  const [blogData, setBlogData] = useState(initialBlogData)

  return (
    <Box
      sx={{ mt: 2 }}
      component="section"
    >
      {user?.id === 113 && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() => {
              setIsAddBlogDialogOpen(true)
            }}
          >
            add blog
          </Button>
          <Dialog open={isAddBlogDialogOpen}>
            <form
              onSubmit={(e) => {
                handleAddBlog(e, blogData)
                setBlogData(initialBlogData)
              }}
            >
              <DialogTitle>Add Blog</DialogTitle>
              <DialogContent>
                <Grid
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <TextField
                    label="Title"
                    value={blogData.title}
                    required
                    autoComplete="off"
                    error={blogData.title.length > 50}
                    onChange={(e) => {
                      setBlogData({ ...blogData, title: e.target.value })
                    }}
                  />
                  <TextField
                    label="Author"
                    value={blogData.author}
                    required
                    autoComplete="off"
                    error={blogData.author.length > 50}
                    onChange={(e) => {
                      setBlogData({ ...blogData, author: e.target.value })
                    }}
                  />
                  <TextField
                    label="Link"
                    value={blogData.link}
                    required
                    autoComplete="off"
                    error={blogData.link.length > 255}
                    onChange={(e) => {
                      setBlogData({ ...blogData, link: e.target.value })
                    }}
                  />
                  <TextField
                    label="Image url"
                    value={blogData.image_url}
                    required
                    autoComplete="off"
                    error={blogData.image_url.length > 255}
                    onChange={(e) => {
                      setBlogData({
                        ...blogData,
                        image_url: e.target.value,
                      })
                    }}
                  />
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsAddBlogDialogOpen(false)}>
                  close
                </Button>
                <Button
                  type="submit"
                  disabled={
                    blogData.title.length > 50 ||
                    blogData.author.length > 50 ||
                    blogData.link.length > 255 ||
                    blogData.image_url.length > 255 ||
                    blogData.title.length === 0 ||
                    blogData.author.length === 0 ||
                    blogData.link.length === 0 ||
                    blogData.image_url.length === 0
                  }
                >
                  submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      )}
    </Box>
  )
}

export default BlogAdminSection
