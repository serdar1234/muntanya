import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function PeakDescription({ text }: { text: string }) {
  return (
    <Accordion>
      <AccordionSummary
        id="peak-description-header"
        aria-controls="peak-description-content"
        expandIcon={<ArrowDropDownIcon />}
      >
        <Typography
          component="h3"
          sx={{ fontWeight: "bold" }}
          color="text.primary"
        >
          Description
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        id="peak-description-content"
        aria-labelledby="peak-description-header"
      >
        {text.split(/\n/).map((sentence, index) => (
          <Typography key={index} color="text.secondary">
            {sentence}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
