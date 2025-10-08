import {
  AutocompleteRenderInputParams,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const renderSearchInput = (
  params: AutocompleteRenderInputParams,
  loading: boolean,
  handleSearchClick: () => void,
) => {
  params.inputProps["aria-label"] = "Search";

  return (
    <TextField
      {...params}
      aria-label="Search"
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

export default renderSearchInput;
