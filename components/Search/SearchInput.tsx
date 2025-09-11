"use client";

import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, Stack } from "@mui/material";
import { getAutocompleteSuggestions } from "@/shared/api";
import { Peak } from "@/shared/types";
import styles from "./SearchInput.module.scss";
import renderSearchInput from "./renderSearchInput";

export default function SearchComponent() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Peak[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      const data = await getAutocompleteSuggestions(inputValue);
      setOptions(data);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const handleOptionSelect = (
    event: SyntheticEvent,
    value: Peak | string | null,
  ) => {
    if (value && typeof value !== "string") {
      setLoading(true);
      router.push(`/mountains/${value.slug}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      setLoading(true);
      const exactMatch = options.find(
        (mountain) => mountain.name.toLowerCase() === inputValue.toLowerCase(),
      );

      if (exactMatch) {
        router.push(`/mountains/${exactMatch.slug}`);
      } else {
        const encodedSearchText = encodeURIComponent(inputValue);
        // router.push(`/mountains/${encodedSearchText}`);
        router.push(`/search?q=${encodedSearchText}`);
      }
    }
  };

  const handleSearchClick = () => {
    const encodedSearchText = encodeURIComponent(inputValue);
    router.push(`/mountains/${encodedSearchText}`);
  };

  return (
    <Stack
      spacing={2}
      width="300px"
      className={styles["search-box"]}
      sx={{
        position: "absolute",
        left: "4rem",
        top: "1.5rem",
        zIndex: 401,
      }}
    >
      <Autocomplete
        size="small"
        options={options} // тут берутся данные для автозаполнения
        className={styles["search-input"]}
        getOptionLabel={(option) => {
          // текст в инпуте после выбора из списка
          if (typeof option === "string") {
            return option;
          }
          return `${option.name}`;
        }}
        onChange={handleOptionSelect}
        getOptionKey={(option) => {
          // key для списка
          if (typeof option === "string") {
            return option;
          }
          return option.slug;
        }}
        onInputChange={(event: SyntheticEvent, newInputValue: string) => {
          setInputValue(newInputValue); // контроль ввода
        }}
        onKeyDown={handleKeyDown}
        freeSolo
        renderOption={(props, option) => {
          // как выглядят элементы списка
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
        // внешний вид поля инпут
        renderInput={(params) =>
          renderSearchInput(params, loading, handleSearchClick)
        }
      />
    </Stack>
  );
}
