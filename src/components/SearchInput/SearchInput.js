import React, { useState, useEffect } from "react";

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

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles({
  root: {
    border: "1px solid red",
    width: "100%"
  },
  listContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 56,
    padding: "0px 32px",
    border: "1px solid black"
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

function renderResults(results) {
  return results.map(result => (
    <BookListItem
      title={result.title}
      author={result.title}
      link={result.link}
    />
  ));
}

export default function SearchInput({ fetchSearch, isLoading, results }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [listVisible, setListVisible] = useState(false);

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

  return (
    <>
      <TextField
        className={classes.root}
        value={searchValue}
        onChange={e => handleChange(e)}
        variant="outlined"
        label="Search"
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
            <List className>{renderResults(results)}</List>
          </Paper>
        </div>
      )}
    </>
  );
}
