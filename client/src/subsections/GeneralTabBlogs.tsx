import { Box, Grid } from "@mui/material"
import { Tip } from "../components"
import axios from "axios"
import { useQuery } from "react-query"
import { BlogTypes } from "../Types"
import HabitsSkeleton from "../skeletons/HabitsSkeleton"

const GeneralTabBlogs = () => {
  const getAllBlogs = async () => {
    const res = await axios.get("http://localhost:5432/all-blogs")
    console.log(res.data)
    return res.data
  }
  const { data: blogs, isLoading: areBlogsLoading } = useQuery(
    "blogs",
    getAllBlogs
  )

  return (
    <Grid
      gap={2}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {areBlogsLoading ? (
        <HabitsSkeleton />
      ) : (
        <Box>
          {!blogs.length
            ? "No blogs"
            : blogs.map((blog: BlogTypes) => <Tip key={blog.id} />)}
        </Box>
      )}
    </Grid>
  )
}

export default GeneralTabBlogs
