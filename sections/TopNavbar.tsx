import { useState } from "react"
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import PersonIcon from "@mui/icons-material/Person"

const pages = ["Habits", "Tips"]
const settings = ["Profile", "Account", "Dashboard", "Logout"]

const TopNavbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget)
  }
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="sticky"
      sx={{ mb: 2 }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: { xs: "none", md: "flex" },
          alignContent: "center",
          height: 50,
        }}
      >
        <Box
          component="img"
          src="logo.svg"
          alt="logo"
          sx={{
            height: "50px",
            display: { xs: "none", md: "flex" },
          }}
        />

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          component="img"
          src="logo.svg"
          alt="logo"
          sx={{
            height: "45px",
            width: "100%",
            display: { xs: "flex", md: "none" },
          }}
        />

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 1, color: "text.primary", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex" }}>
          <Tooltip title="Open Profile">
            <IconButton onClick={handleOpenUserMenu}>
              <PersonIcon
                fontSize="large"
                sx={{ color: "constrast" }}
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>

      <Container
        sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center" }}
        maxWidth="xl"
      >
        <Box
          component="img"
          src="logo-text.svg"
          alt="logo"
          height={50}
        />
      </Container>
    </AppBar>
  )
}

export default TopNavbar
