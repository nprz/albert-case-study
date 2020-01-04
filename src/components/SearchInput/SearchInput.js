import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

// Components
import SearchList from "components/SearchList";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// Helpers
import useDebounce from "helpers/useDebounce";

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles({
  inputContainer: {
    width: "100%",
    display: "flex"
  },
  inputAndResults: {
    width: "100%",
    margin: "0px 8px",
    position: "relative"
  },
  input: {
    width: "100%"
  },
  select: {
    width: 75
  },
  button: {
    width: 120
  },
  placeHolder: {
    width: 20,
    height: 20
  }
});

export const categoryDict = {
  ALL: "all",
  TITLE: "title"
};

function renderMenuItems() {
  let menuItems = [];

  for (const category in categoryDict) {
    menuItems.push(
      <MenuItem value={categoryDict[category]} key={categoryDict[category]}>
        {categoryDict[category].toUpperCase()}
      </MenuItem>
    );
  }

  return menuItems;
}

export default function SearchInput({
  fetchSearch,
  fetchSearchResults,
  isLoading,
  results,
  error
}) {
  const classes = useStyles();
  const [inputFocus, setInputFocus] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState(categoryDict.ALL);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchSearch(debouncedSearchValue, selectValue);
  }, [debouncedSearchValue, fetchSearch, selectValue]);

  useEffect(() => {
    if (searchValue && inputFocus) {
      setListVisible(true);
    } else {
      setListVisible(false);
    }
  }, [inputFocus, searchValue]);

  const handleChange = useCallback(e => {
    setSearchValue(e.target.value);
    setInputFocus(true);
  }, []);

  const handleSearchAgain = useCallback(() => {
    setSearchValue("");
    fetchSearch("", selectValue);
    inputRef.current.focus();
  }, [fetchSearch, selectValue]);

  const handleKeyPress = useCallback(
    e => {
      if (e.key === "Enter") {
        fetchSearchResults(searchValue, selectValue, 1);
        setInputFocus(false);
      }
    },
    [fetchSearchResults, searchValue, selectValue]
  );

  return (
    <div className={classes.inputContainer}>
      <Select
        classes={{
          root: classes.select
        }}
        variant="outlined"
        value={selectValue}
        onChange={e => setSelectValue(e.target.value)}
      >
        {renderMenuItems()}
      </Select>
      <div className={classes.inputAndResults}>
        <TextField
          value={searchValue}
          onChange={e => handleChange(e)}
          className={classes.input}
          variant="outlined"
          label="Search"
          inputRef={inputRef}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setTimeout(() => setInputFocus(false), 250)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <div className={classes.placeHolder} />
                )}
                <IconButton onClick={handleSearchAgain}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {listVisible && (
          <SearchList
            results={results}
            searchValue={debouncedSearchValue}
            isLoading={isLoading}
            handleClick={handleSearchAgain}
            error={error}
          />
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => fetchSearchResults(searchValue, selectValue, 1)}
      >
        SEARCH
      </Button>
    </div>
  );
}

SearchInput.propTypes = {
  fetchSearch: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired
};
