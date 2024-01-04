import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  TextField,
} from "@mui/material"
import { Blog } from "../components"
import axios from "axios"
import { useQuery } from "react-query"
import { BlogTypes } from "../Types"
import HabitsSkeleton from "../skeletons/HabitsSkeleton"
import { useSelector } from "react-redux"
import { RootState } from "../Store"
import React, { useState } from "react"
import { useParams } from "react-router-dom"

const GeneralTabBlogs = () => {
  const user = useSelector((state: RootState) => state.session.user)

  const { page: pageNoParams } = useParams()
  const [page, setPage] = useState(pageNoParams)

  const getAllBlogs = async () => {
    const res = await axios.get("http://localhost:5432/all-blogs")
    return res.data
  }
  const { data: blogs, isLoading: areBlogsLoading } = useQuery(
    "blogs",
    getAllBlogs
  )

  const initialBlogData = {
    title: "",
    author: "",
    link: "",
    image_url: "",
  }

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault()

    axios
      .post("http://localhost:5432/add-blog", JSON.stringify(blogData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        setBlogData(initialBlogData)
      })
  }

  const [isAddBlogDialogOpen, setIsAddBlogDialogOpen] = useState(false)
  const [blogData, setBlogData] = useState(initialBlogData)
  return (
    <Box>
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
            <form onSubmit={handleAddBlog}>
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

      <Box>
        {areBlogsLoading ? (
          <HabitsSkeleton />
        ) : (
          <>
            <Grid
              gap={2}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              {!blogs.length
                ? "No blogs"
                : blogs
                    .slice((Number(page) - 1) * 15, Number(page) * 15)
                    .map((blog: BlogTypes) => (
                      <Blog
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        author={blog.author}
                        date_posted={blog.date_posted
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join(".")}
                        blog_link={blog.link}
                        image_url={blog.image_url}
                      />
                    ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(blogs.length / 15)}
                onChange={(_e, value) => {
                  setPage(String(value))
                }}
                page={Number(page)}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default GeneralTabBlogs
