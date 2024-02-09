import { Box, Button, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { BlogRemoveButton } from "."

const Blog = ({
  id,
  title,
  author,
  date_posted,
  blog_link,
  image_url,
}: {
  id: number
  title: string
  author: string
  date_posted: string
  blog_link: string
  image_url: string
}) => {
  const user = useSelector((state: RootState) => state.session.user)
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  )

  return (
    <Box
      component="article"
      sx={{
        width: 300,
        height: 350,
        bgcolor: `primary.${colorTheme}`,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          background: `url('${image_url}') no-repeat center/cover`,
          width: 300,
          height: 150,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          border: "1px solid black",
        }}
      ></Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 200,
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
            <Typography
              sx={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              {author}
            </Typography>
          </Box>
          <Typography
            component="p"
            variant="caption"
            sx={{ textAlign: "right" }}
          >
            {date_posted}
          </Typography>
        </Box>
        <Box>
          <a
            href={blog_link}
            target="_blank"
          >
            <Button sx={{ width: user?.id === 113 ? "50%" : "100%" }}>
              view
            </Button>
          </a>
          {user?.id === 113 && <BlogRemoveButton id={id} />}
        </Box>
      </Box>
    </Box>
  )
}

export default Blog
