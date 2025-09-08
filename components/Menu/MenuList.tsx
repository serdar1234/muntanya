import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TerrainIcon from "@mui/icons-material/Terrain";
import Link from "next/link";

export function MenuList({
  toggleDrawer,
}: {
  toggleDrawer: (open: boolean) => void;
}) {
  return (
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
}
