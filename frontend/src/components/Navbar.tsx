// src/components/Navbar.tsx
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const pages = [
  { text: "Home", path: "/" },
  { text: "Tasks", path: "/tasks" },
  { text: "Login", path: "/login" },
  { text: "Signup", path: "/signup" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static" // normal flow
      sx={{
        backgroundColor: "#dcdcdcff",
        borderRadius: "10px",
        width: "98%",
        margin: "10px auto",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Brand */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Nunito",
              fontWeight: 900,
              color: "darkslategray",
              textDecoration: "none",
            }}
          >
            FocusBuddy
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
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
              sx={{
                display: { xs: "block", md: "none", fontFamily: "Open Sans" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.text}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Brand */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Nunito",
              fontWeight: 900,
              color: "darkslategray",
              textDecoration: "none",
            }}
          >
            FocusBuddy
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "darkslategray",
                  display: "block",
                  fontFamily: "Open Sans",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
