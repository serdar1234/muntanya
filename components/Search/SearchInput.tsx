import { LuSearch } from "react-icons/lu";
import { Box, Input, InputGroup } from "@chakra-ui/react";
import styles from "./SearchInput.module.scss";

export default function SearchInput() {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      className={styles["search-input"]}
    >
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input placeholder="Search" />
      </InputGroup>
    </Box>
  );
}
