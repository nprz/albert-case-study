import React, { useState, useEffect, useRef } from "react";

// Components
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  listContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 56,
    marginBottom: 32
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

function BookListItem({ title, author, link }) {
  return (
    <ListItem
      button
      component="a"
      href={`https://openlibrary.org${link}`}
      target="_blank"
      rel="noopener"
    >
      <ListItemText primary={title} secondary={author} />
    </ListItem>
  );
}

function renderResults(results, searchValue, isLoading, handleClick, error) {
  if (error) {
    return (
      <ListItem key={"key"}>
        <ListItemText
          primary={`Sorry! We were unable to process a search for "${searchValue}"`}
        />
        <Button onClick={handleClick}>Search Again?</Button>
      </ListItem>
    );
  }

  if (!results.length && searchValue && !isLoading) {
    return (
      <ListItem key={"key"}>
        <ListItemText primary={`Sorry! No results found for ${searchValue}`} />
        <Button onClick={handleClick}>Search Again?</Button>
      </ListItem>
    );
  }

  return results.map((result, index) => (
    <div key={result.link}>
      <BookListItem
        title={result.title}
        author={result.author}
        link={result.link}
      />
      {index !== results.length - 1 && <Divider />}
    </div>
  ));
}

function renderMenuItems() {
  let menuItems = [];

  for (const category in categoryDict) {
    menuItems.push(
      <MenuItem value={categoryDict[category]}>
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
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchValue && inputFocus) {
      setListVisible(true);
    } else {
      setListVisible(false);
    }
  }, [inputFocus, searchValue]);

  const handleChange = e => {
    setSearchValue(e.target.value);
    fetchSearch(e.target.value, selectValue);
    setInputFocus(true);
  };

  const handleSearchAgain = () => {
    setSearchValue("");
    fetchSearch("", selectValue);
    inputRef.current.focus();
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      fetchSearchResults(searchValue, selectValue, 1);
      setInputFocus(false);
    }
  };

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
          <div className={classes.listContainer}>
            <Paper className={classes.paper}>
              <List>
                {renderResults(
                  results,
                  searchValue,
                  isLoading,
                  handleSearchAgain,
                  error
                )}
              </List>
            </Paper>
          </div>
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
