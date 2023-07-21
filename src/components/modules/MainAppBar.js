import { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import AppBar from "@mui/material/AppBar";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { useLocation } from "react-router-dom";
import { routerNames } from "./../../routerNames";

export default function MainAppBar({
  drawerWidth,
  handleModalToggle,
  setModalOpen
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [routeName, setRouteName] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const result = routerNames.find(({ path }) => path === location.pathname);
    if (result !== undefined) setRouteName(result.name);
  }, [location]);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
      component="nav"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={() => {
            handleModalToggle("drawer");
          }}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {routeName}
        </Typography>
        <IconButton
          size="large"
          aria-label="Account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleModalToggle("settings");
            }}
          >
            Settings
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
