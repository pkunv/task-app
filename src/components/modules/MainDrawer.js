import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";

import { StyledLink } from "./StyledLink";

const StyledListItemButton = styled(ListItemButton)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  display: "flex",
  justifyContent: "center"
}));

const mainDrawerItems = (
  <React.Fragment>
    <Toolbar disableGutters={true}>
      <Typography variant="h5" sx={{ margin: "0 auto", fontWeight: "bold" }}>
        Task App
      </Typography>
    </Toolbar>
    <Divider />
    <StyledLink
      to="/"
      className={({ isActive }) => (isActive ? "activeLink" : "notActiveLink")}
    >
      <ListItem disablePadding>
        <StyledListItemButton>
          <StyledListItemIcon>
            <DashboardIcon />
          </StyledListItemIcon>
          <ListItemText primary="Dashboard" />
        </StyledListItemButton>
      </ListItem>
    </StyledLink>
    <StyledLink to="/tasks?setting=myday">
      <ListItem disablePadding>
        <StyledListItemButton>
          <StyledListItemIcon>
            <DescriptionIcon />
          </StyledListItemIcon>
          <ListItemText primary="My Day" />
        </StyledListItemButton>
      </ListItem>
    </StyledLink>
    <StyledLink to="/tasks">
      <ListItem disablePadding>
        <StyledListItemButton>
          <StyledListItemIcon>
            <DescriptionIcon />
          </StyledListItemIcon>
          <ListItemText primary="Tasks" />
        </StyledListItemButton>
      </ListItem>
    </StyledLink>
    <StyledLink to="/report">
      <ListItem disablePadding>
        <StyledListItemButton>
          <StyledListItemIcon>
            <BarChartIcon />
          </StyledListItemIcon>
          <ListItemText primary="Report" />
        </StyledListItemButton>
      </ListItem>
    </StyledLink>
    <ListItem disablePadding>
      <StyledListItemButton>
        <StyledListItemIcon>
          <WbSunnyIcon />
        </StyledListItemIcon>
        <ListItemText primary="Vacations" />
      </StyledListItemButton>
    </ListItem>
  </React.Fragment>
);

export default function MainDrawer({ drawerWidth, open, handleModalToggle }) {
  return (
    <>
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={open}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        onClose={() => {
          handleModalToggle("drawer");
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
          }
        }}
      >
        {mainDrawerItems}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
          }
        }}
        open
      >
        {mainDrawerItems}
      </Drawer>
    </>
  );
}
