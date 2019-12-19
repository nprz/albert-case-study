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

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  listContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 56,
    padding: "0px 32px",
    marginBottom: 32
  },
  placeHolder: {
    width: 20,
    height: 20
  }
});

function BookListItem({ title, author, link }) {
  return (
    <ListItem
      button
      component="a"
      href={`https://openlibrary.org/${link}`}
      target="_blank"
      rel="noopener"
    >
      <ListItemText primary={title} secondary={author} />
    </ListItem>
  );
}

function renderResults(results, searchValue, isLoading, handleClick) {
  if (!results.length && searchValue && !isLoading) {
    return (
      <ListItem>
        <ListItemText primary={`Sorry! No results found for ${searchValue}`} />
        <Button onClick={handleClick}>Search Again?</Button>
      </ListItem>
    );
  }

  return results.map((result, index) => (
    <>
      <BookListItem
        title={result.title}
        author={result.title}
        link={result.link}
      />
      {index !== results.length - 1 && <Divider />}
    </>
  ));
}

export default function SearchInput({ fetchSearch, isLoading, results }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchValue) {
      setListVisible(true);
    } else {
      setListVisible(false);
    }
  }, [inputFocus, searchValue]);

  const handleChange = e => {
    setSearchValue(e.target.value || "");
    fetchSearch(e.target.value || "");
  };

  const handleSearchAgain = () => {
    setSearchValue("");
    fetchSearch("");
    inputRef.current.focus();
  };

  return (
    <>
      <TextField
        className={classes.root}
        value={searchValue}
        onChange={e => handleChange(e)}
        variant="outlined"
        label="Search"
        inputRef={inputRef}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
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
              <IconButton onClick={handleChange}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {listVisible && (
        <div className={classes.listContainer}>
          <Paper className={classes.paper}>
            <List className>
              {renderResults(
                results,
                searchValue,
                isLoading,
                handleSearchAgain
              )}
            </List>
          </Paper>
        </div>
      )}
    </>
  );
}
