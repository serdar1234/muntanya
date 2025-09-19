"use client";

import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuList } from "./MenuList";
import styles from "./Menu.module.scss";

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
        className={styles["menu-button"]}
        onClick={() => toggleDrawer(true)}
        sx={{
          position: "absolute",
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
