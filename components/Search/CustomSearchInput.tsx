import {
  AutocompleteRenderInputParams,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useId } from "react";

const CustomSearchInput = (
  params: AutocompleteRenderInputParams,
  loading: boolean,
  handleSearchClick: () => void,
) => {
  const newID = useId();
  params.inputProps["aria-label"] = "Search";
  params.inputProps.id = newID;

  return (
    <TextField
      {...params}
      variant="outlined"
      sx={{ pr: 0 }}
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
              {params.InputProps.endAdornment}
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <IconButton
                    aria-label="search button"
                    onClick={handleSearchClick}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </InputAdornment>
            </>
          ),
        },
      }}
    />
  );
};

export default CustomSearchInput;
