"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { useAsync } from "react-use";
import {
  Box,
  IconButton,
  Group,
  InputGroup,
  Spinner,
  Combobox,
  HStack,
  Portal,
  Span,
  useListCollection,
} from "@chakra-ui/react";
import { Peak } from "@/shared/types";
import styles from "./SearchInput.module.scss";
import { getAutocompleteSuggestions } from "@/shared/api";

export default function SearchInput() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const { collection, set } = useListCollection<Peak>({
    initialItems: [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.slug,
  });

  const state = useAsync(async () => {
    if (inputValue.length < 3) {
      return [];
    }
    const suggestions = await getAutocompleteSuggestions(inputValue);
    set(suggestions);
  }, [inputValue, set]);

  const handleSelectSuggestion = (item: Peak) => {
    router.push(`/mountains/${item.slug}`);
    setInputValue("");
  };

  const handleSearch = () => {
    const firstItem = collection.items[0];
    if (firstItem) {
      handleSelectSuggestion(firstItem);
    } else {
      router.push(`/mountains/${inputValue}`);
    }
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
      <Combobox.Root
        width="100%"
        collection={collection}
        placeholder="Mountains"
        onInputValueChange={(e) => setInputValue(e.inputValue)}
        positioning={{ sameWidth: false, placement: "bottom-start" }}
      >
        <Combobox.Control>
          <InputGroup flex="1">
            <Group attached w="full" maxW="sm">
              <Combobox.Input
                placeholder="Search mountain..."
                className={styles["search-input"]}
                onKeyDown={handleKeyDown}
                disabled={state.loading}
              />
              <IconButton
                aria-label="Search"
                type="button"
                onClick={handleSearch}
                disabled={state.loading}
              >
                {state.loading ? <Spinner size="sm" /> : <LuSearch />}
              </IconButton>
            </Group>
          </InputGroup>
        </Combobox.Control>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content minW="sm">
              {state.loading ? (
                <HStack p="2">
                  <Spinner size="xs" borderWidth="1px" />
                  <Span>Loading...</Span>
                </HStack>
              ) : state.error ? (
                <Span p="2" color="fg.error">
                  Error fetching
                </Span>
              ) : (
                collection.items?.map((peak) => (
                  <Combobox.Item key={peak.slug} item={peak.slug}>
                    <HStack justify="space-between" textStyle="sm">
                      <Span fontWeight="medium" truncate>
                        {peak.name}
                      </Span>
                      <Span color="fg.muted" truncate>
                        {peak.country} / {peak.region}
                      </Span>
                    </HStack>
                  </Combobox.Item>
                ))
              )}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </Box>
  );
}
