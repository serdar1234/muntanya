import { ApiPeak } from "@/shared/types";
import Link from "next/link";
import { ListItem, ListItemText, Typography } from "@mui/material";

export default function SearchResultCard({ peak }: { peak: ApiPeak }) {
  return (
    <>
      <ListItem
        component={Link}
        href={`/mountains/${peak.slug}`}
        sx={{ textDecoration: "none", cursor: "pointer" }}
      >
        <ListItemText
          primary={
            <Typography variant="body1" fontWeight="bold">
              {peak.name}
            </Typography>
          }
          secondary={peak.elevation}
        />
      </ListItem>
    </>
  );
}
