// import { LuSearch } from "react-icons/lu";
// import { Box, Input, InputGroup } from "@chakra-ui/react";
// import styles from "./SearchInput.module.scss";

// export default function SearchInput() {
//   return (
//     <Box
//       height="100vh"
//       display="flex"
//       justifyContent="center"
//       className={styles["search-input"]}
//     >
//       <InputGroup flex="1" startElement={<LuSearch />}>
//         <Input placeholder="Search" />
//       </InputGroup>
//     </Box>
//   );
// }

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
    // Проверяем, что нажата клавиша "Enter"
    if (e.key === "Enter") {
      const mountainSlug = searchQuery.toLowerCase();
      // Обновляем URL, не перезагружая страницу
      router.push(`/?mountain=${mountainSlug}`);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      className={styles["search-input"]}
    >
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input
          type="text"
          placeholder="Поиск горы..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          borderRadius="8px"
          border="2px solid rgba(0, 0, 0, 0.2)"
          fontSize="1rem"
          backgroundColor="rgba(255, 255, 255, 0.8)"
          paddingLeft="2.5rem"
        />
      </InputGroup>
    </Box>
  );
}
