"use client";

import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuList } from "./MenuList";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };

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
          zIndex: 401,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
        <MenuList toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
}
