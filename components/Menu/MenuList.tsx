import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TerrainIcon from "@mui/icons-material/Terrain";
import Link from "next/link";

export function MenuList({
  toggleDrawer,
}: {
  toggleDrawer: (open: boolean) => void;
}) {
  const listItems = [
    { text: "Home", href: "/" },
    { text: "Mount Everest", href: "/mountains/mount-everest" },
    { text: "Kilimanjaro", href: "/mountains/kilimanjaro" },
    { text: "Ama Dablam", href: "/mountains/ama-dablam" },
  ];

  return (
    <div
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {listItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            href={item.href}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemIcon>
              {item.text === "Home" ? <HomeIcon /> : <TerrainIcon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
