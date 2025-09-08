"use client";

import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { getAutocompleteSuggestions } from "@/shared/api";
import styles from "./SearchInput.module.scss";
import { Peak } from "@/shared/types";

export default function SearchComponent() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Peak[]>([]);

  // Хук для загрузки вариантов автозаполнения
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      const data = await getAutocompleteSuggestions(inputValue);
      setOptions(data);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  // Обработчик события для нажатия Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      // Ищем точное совпадение в списке
      const exactMatch = options.find(
        (mountain) => mountain.name.toLowerCase() === inputValue.toLowerCase(),
      );

      if (exactMatch) {
        // Если нашли совпадение, переходим на страницу горы по slug
        router.push(`/mountains/${exactMatch.slug}`);
      } else {
        // Если совпадения нет, переходим на общую страницу поиска по query
        const encodedSearchText = encodeURIComponent(inputValue);
        router.push(`/search?q=${encodedSearchText}`);
      }
    }
  };

  return (
    <Stack spacing={2} width="300px" className={styles["search-box"]}>
      <Autocomplete
        size="small"
        options={options}
        className={styles["search-input"]}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return `${option.name}`;
        }}
        getOptionKey={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return option.slug;
        }}
        onInputChange={(event: SyntheticEvent, newInputValue: string) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={handleKeyDown}
        freeSolo
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;
          return (
            <li key={key} {...otherProps}>
              <div style={{ padding: "8px" }}>
                <strong>{option.name}</strong>
                <div style={{ color: "#888", fontSize: "0.8rem" }}>
                  {option.region} / {option.country}
                </div>
              </div>
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
    </Stack>
  );
}
