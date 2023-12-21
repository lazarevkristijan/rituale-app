import { Box, Button, Typography } from "@mui/material"

const Blog = ({
  title,
  author,
  date_posted,
  short_description,
  blog_link,
  image_url,
}: {
  title: string
  author: string
  date_posted: string
  short_description: string
  blog_link: string
  image_url: string
}) => {
  return (
    <Box
      sx={{ width: 300, height: 450, bgcolor: "primary.dark", borderRadius: 2 }}
    >
      <Box
        sx={{
          background: `url('${image_url}') no-repeat center/cover`,
          width: 300,
          height: 150,
        }}
      ></Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
          <Typography sx={{ fontWeight: "bold", textDecoration: "underline" }}>
            {author}
          </Typography>
          <br />
          <Typography>{short_description}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href={blog_link}
            target="_blank"
          >
            <Button>view</Button>
          </a>
          <Typography>{date_posted}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Blog
