"use client";

import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TerrainIcon from "@mui/icons-material/Terrain";
import Link from "next/link";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };

  const menuList = () => (
    <div
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItem
          component={Link}
          href="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItem>
        <ListItem
          component={Link}
          href="/mountains/mount-everest"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <TerrainIcon />
          </ListItemIcon>
          <ListItemText primary="Гора Эверест" />
        </ListItem>
        <ListItem
          component={Link}
          href="/mountains/kilimanjaro"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemIcon>
            <TerrainIcon />
          </ListItemIcon>
          <ListItemText primary="Гора Килиманджаро" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => toggleDrawer(true)}
        sx={{
          position: "absolute",
          right: "2rem",
          top: "1.5rem",
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
        {menuList()}
      </Drawer>
    </>
  );
}
