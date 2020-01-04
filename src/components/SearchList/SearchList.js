import React from "react";
import PropTypes from "prop-types";

// Components
import BookListItem from "components/BookListItem";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles(theme => {
  return {
    root: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 56,
      marginBottom: 32
    }
  };
});

function renderResults(results, searchValue, isLoading, handleClick, error) {
  if (error) {
    return (
      <ListItem>
        <ListItemText
          primary={`Sorry! We were unable to process a search for "${searchValue}"`}
        />
        <Button onClick={handleClick}>Search Again?</Button>
      </ListItem>
    );
  }

  if (!results.length && searchValue && !isLoading) {
    return (
      <ListItem>
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

export default function SearchList({
  results,
  searchValue,
  isLoading,
  handleClick,
  error
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper>
        <List disablePadding={true}>
          {renderResults(results, searchValue, isLoading, handleClick, error)}
        </List>
      </Paper>
    </div>
  );
}

SearchList.propTypes = {
  results: PropTypes.array.isRequired,
  searchValue: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
};
