import { Box, Grid, Pagination } from "@mui/material"
import { useQuery } from "react-query"
import { BlogTypes } from "../../Types"
import HabitsSkeleton from "../../skeletons/HabitsSkeleton"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getAllBlogs } from "../../Utils/GeneralUtils"
import { BlogAdminSection } from "./BlogAdminSection"
import Blog from "../../components/GeneralComponents/Blog"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"

const TabBlogs = () => {
  const { page: pageNoParams } = useParams()
  const [page, setPage] = useState(pageNoParams)

  const user = useSelector((state: RootState) => state.session.user)

  const { data: blogs, isLoading: areBlogsLoading } = useQuery(
    "blogs",
    getAllBlogs
  )

  return (
    <Box>
      <Box>
        {areBlogsLoading ? (
          <HabitsSkeleton />
        ) : (
          <>
            {user?.id === 113 && <BlogAdminSection />}

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

export default TabBlogs
