import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Stack,
  Drawer,
} from "@mui/material";
import uplb_logo from "../assets/uplb_logo.png";
import icspaces_logo from "../assets/ICSpaces_logo.png";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  // Menu items
  // const menuItems = [
  //   { label: "Login", link: "/" },
  //   { label: "Home", link: "/homepage" },
  //   { label: "View Rooms", link: "/viewroomspage" },
  //   { label: "My Reservations", link: "/reservationspage" },
  //   { label: "Account", link: "/accountpage" },
  //   // Add more menu items as needed
  // ];
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const menuItems = isAdmin
    ? [
        { label: "Home", link: "/homepage_admin" },
        { label: "Reservations", link: "/reservationspage_admin" },
        { label: "Rooms", link: "/roomspage_admin" },
        { label: "Accounts", link: "/accountspage_admin" },
        { label: "Schedules", link: "/schedulepage_admin" },
        { label: "Edit Room Info", link: "/editroominfopage_admin" },
        {
          label: "Make Reservation",
          link: "/bookreservationpage_admin",
        },
        { label: "Normal User", onClick: () => setIsAdmin(false) },
      ]
    : [
        { label: "Login", link: "/" },
        { label: "Home", link: "/homepage" },
        { label: "View Rooms", link: "/viewroomspage" },
        { label: "My Reservations", link: "/reservationspage" },
        { label: "FAQs", link: "/faqspage" },
        { label: "Admin", onClick: () => setIsAdmin(true) }, // non-admin menu items here

        // { label: "Account", link: "/accountpage" },
      ];

  return (
    <Box sx={{ marginBottom: { xs: 3, sm: 8, md: 1 } }}>
      {" "}
      {/* Add bottom margin */}
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={icspaces_logo} alt="UPLB Logo" height="50" width="50" />
            <Typography variant="h6" component="div" color="secondary" ml={2}>
              ICSpaces
            </Typography>
          </Box>

          <Box sx={{ justifyContent: "center" }} />

          {/* Render menu items */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}
            justifyContent="center"
          >
            {menuItems.map((item, index) => (
              <Button
                key={index}
                component={item.link ? RouterLink : "button"}
                to={item.link}
                onClick={() => {
                  if (typeof item.onClick === "function") {
                    item.onClick();
                  }
                  setSelectedItem(item.label); // Set the selected item
                }}
                color={selectedItem === item.label ? "secondary" : "inherit"} // Change color if selected
                sx={{ "&:hover": { color: "#FFB532" } }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
          <Button
            color="inherit"
            component={Link}
            to="/accountpage"
            onClick={() => {
              /* Add the onClick handler for the "Account" button */
            }}
          >
            <IconButton color="secondary">
              <AccountCircleIcon />
            </IconButton>
            <Typography variant="button" color="inherit">
              Account
            </Typography>
          </Button>

          {/* Render mobile/tablet view */}
          {/* Render mobile/tablet view */}
          <Stack sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={openMenu}
              sx={{ "&:hover": { color: "#FFB532" } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={Boolean(anchorNav)}
              onClose={closeMenu}
              anchor="right"
              PaperProps={{ style: { width: "40%" } }}
            >
              <Stack>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    component={item.link ? RouterLink : "button"}
                    to={item.link}
                    onClick={item.onClick}
                    color="inherit"
                    sx={{ "&:hover": { color: "#FFB532" } }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </Drawer>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
