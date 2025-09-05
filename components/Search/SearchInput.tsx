"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { Box, Input, InputGroup } from "@chakra-ui/react";
import styles from "./SearchInput.module.scss";

export default function SearchInput() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const mountainSlug = searchQuery.toLowerCase();
      // Переходим на SEO-дружественный URL
      router.push(`/mountains/${mountainSlug}`);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      className={styles["search-box"]}
    >
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input
          type="text"
          placeholder="Search mountain..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className={styles["search-input"]}
        />
      </InputGroup>
    </Box>
  );
}
