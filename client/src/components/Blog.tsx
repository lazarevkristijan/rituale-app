import { Box, Button, Typography } from "@mui/material"

const Blog = ({
  title,
  author,
  date_posted,
  blog_link,
  image_url,
}: {
  title: string
  author: string
  date_posted: string
  blog_link: string
  image_url: string
}) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 350,
        bgcolor: "primary.dark",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          background: `url('${image_url}') no-repeat center/cover`,
          width: 300,
          height: 150,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}
      ></Box>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography sx={{ fontWeight: "bold", textDecoration: "underline" }}>
          {author}
        </Typography>
        <br />
        <Typography
          component="p"
          variant="caption"
          sx={{ textAlign: "right" }}
        >
          {date_posted}
        </Typography>
      </Box>
      <a
        href={blog_link}
        target="_blank"
      >
        <Button sx={{ width: "100%" }}>view</Button>
      </a>
    </Box>
  )
}

export default Blog
