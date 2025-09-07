"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import {
  Box,
  IconButton,
  Group,
  Input,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import styles from "./SearchInput.module.scss";

export default function SearchInput() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    const mountainSlug = searchQuery.toLowerCase();
    if (mountainSlug === "") return;

    setIsLoading(true);

    router.push(`/mountains/${mountainSlug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      className={styles["search-box"]}
    >
      <InputGroup flex="1">
        <Group attached w="full" maxW="sm">
          <Input
            type="text"
            placeholder="Search mountain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className={styles["search-input"]}
          />
          <IconButton
            aria-label="Search"
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : <LuSearch />}
          </IconButton>
        </Group>
      </InputGroup>
    </Box>
  );
}
