import React from "react";

// Components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

// Helpers
import { transparentize } from "polished";

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: 32,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    card: {
      marginBottom: 16,
      width: "100%",
      transition: "background-color .2s",

      "&:hover": {
        backgroundColor: transparentize(0.8, theme.palette.primary.light)
      }
    },
    searchResultInfo: {
      width: "100%",
      border: "1px solid",
      marginBottom: 16
    }
  };
});

function renderSearchResults(
  searchResults,
  isLoading,
  classes,
  totalResults,
  searchValue
) {
  if (isLoading) {
    return <CircularProgress size={40} />;
  }

  const visibleResults = searchResults.map(result => (
    <Card
      className={classes.card}
      component="a"
      href={`https://openlibrary.org${result.link}`}
      rel="noopener"
      target="_blank"
    >
      <CardContent>
        <Typography variant="h6">{result.title}</Typography>
        <Typography variant="body1">by {result.author}</Typography>
        <Typography variant="body1">published {result.year}</Typography>
      </CardContent>
    </Card>
  ));
  console.log(searchValue);
  return (
    <>
      <div className={classes.searchResultInfo}>
        <Typography variant="body1">
          <b>{totalResults}</b> results for search query <b>{searchValue}</b>
        </Typography>
      </div>
      {visibleResults}
    </>
  );
}

export default function SearchResults({
  searchResults,
  isLoading,
  totalResults,
  searchValue
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {renderSearchResults(
        searchResults,
        isLoading,
        classes,
        totalResults,
        searchValue
      )}
    </div>
  );
}
