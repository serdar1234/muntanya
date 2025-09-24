"use client";

import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, Stack } from "@mui/material";
import { getAutocompleteSuggestions } from "@/shared/api";
import { AutocompletePeak } from "@/shared/types";
import styles from "./SearchInput.module.scss";
import renderSearchInput from "./renderSearchInput";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams().toString();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AutocompletePeak[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout;
    if (inputValue.trim() !== "") {
      debounceTimeout = setTimeout(async () => {
        const data = await getAutocompleteSuggestions(inputValue);
        setOptions(data);
      }, 300);
    }

    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const handleOptionSelect = (
    _: SyntheticEvent,
    value: AutocompletePeak | string | null,
  ) => {
    if (value && typeof value !== "string") {
      setLoading(true);
      router.push(`/mountains/${value.slug}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (inputValue === "" || inputValue.trim() === "") return;

    if (event.key === "Enter") {
      setLoading(true);
      const exactMatch = options.find(
        (mountain) => mountain.name.toLowerCase() === inputValue.toLowerCase(),
      );

      if (exactMatch) {
        router.push(`/mountains/${exactMatch.slug}`);
      } else {
        const encodedSearchText = encodeURIComponent(inputValue);
        router.push(`/search?q=${encodedSearchText}`);
      }
    }
  };

  const handleSearchClick = () => {
    if (inputValue === "" || inputValue.trim() === "") return;
    setLoading(true);
    const encodedSearchText = encodeURIComponent(inputValue);
    router.push(`/search?q=${encodedSearchText}`);
  };

  return (
    <Stack spacing={2} className={styles["search-box"]}>
      <Autocomplete
        disableClearable
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
        onInputChange={(_: SyntheticEvent, newInputValue: string) => {
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
                  Elevation: {option.elevation} m
                  <br />
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
