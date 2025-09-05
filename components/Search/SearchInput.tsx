"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { Box, IconButton, Group, Input, InputGroup } from "@chakra-ui/react";
import styles from "./SearchInput.module.scss";

export default function SearchInput() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
  ) => {
    if (e.key === "Enter") {
      const mountainSlug = searchQuery.toLowerCase();
      router.push(`/mountains/${mountainSlug}`);
    }
  };

  const handleButtonClick = () => {
    const mountainSlug = searchQuery.toLowerCase();
    if (mountainSlug === "") return;
    router.push(`/mountains/${mountainSlug}`);
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
            className={styles["search-input"]}
          />
          <IconButton
            aria-label="Search"
            type="button"
            onKeyDown={handleKeyDown}
            onClick={handleButtonClick}
          >
            <LuSearch />
          </IconButton>
        </Group>
      </InputGroup>
    </Box>
  );
}
