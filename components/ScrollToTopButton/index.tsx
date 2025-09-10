import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScrollTrigger, Zoom } from "@mui/material";

const ScrollToTopButton = () => {
  // `useScrollTrigger` помогает определить, когда нужно показывать кнопку
  const trigger = useScrollTrigger({
    disableHysteresis: true, // Кнопка появляется сразу
    threshold: 100, // Показываем кнопку, когда прокручено 100px
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Делает прокрутку плавной
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        size="small"
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 16,
        }}
        onClick={handleClick}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton;
