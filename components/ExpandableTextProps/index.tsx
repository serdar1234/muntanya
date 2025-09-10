import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Шаг 1: Описываем типы для параметров (props)
interface ExpandableTextProps {
  text: string;
  maxLength?: number; // Знак '?' делает этот параметр необязательным
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLength = 250,
}) => {
  // Состояние, которое хранит, развернут ли текст
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Проверяем, нужно ли сокращать текст
  const shouldTruncate = text.length > maxLength;

  // Если текст должен быть сокращен и не развернут, показываем его часть
  const displayableText =
    shouldTruncate && !isExpanded ? text.substring(0, maxLength) + "..." : text;

  // Функция для переключения состояния
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box>
      <Typography variant="body1">{displayableText}</Typography>
      {shouldTruncate && (
        <Button onClick={handleToggle} color="primary">
          {isExpanded ? "Свернуть" : "Развернуть"}
        </Button>
      )}
    </Box>
  );
};

export default ExpandableText;
