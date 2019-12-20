import React from "react";

// Components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

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
      marginBottom: 16
    },
    paginationContainer: {
      height: 32,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32
    },
    paginationCopy: {
      margin: "0px 8px"
    }
  };
});

const PAGE_SIZE = 10;

function renderSearchResults(
  searchResults,
  isLoading,
  totalResults,
  query,
  page,
  category,
  fetchSearchResults,
  classes
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

  return (
    <>
      {query && (
        <div className={classes.searchResultInfo}>
          <Typography variant="body1">
            <b>{totalResults}</b> results for search query <b>"{query}"</b>
          </Typography>
        </div>
      )}
      {visibleResults}
      {query && (
        <div className={classes.paginationContainer}>
          <div>
            <IconButton
              disabled={page === 1}
              onClick={() => fetchSearchResults(query, category, page - 1)}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </div>
          <Typography variant="body1" className={classes.paginationCopy}>
            Page <b>{page}</b> of <b>{Math.ceil(totalResults / PAGE_SIZE)}</b>
          </Typography>
          <div>
            <IconButton
              disabled={page === Math.ceil(totalResults / PAGE_SIZE)}
              onClick={() => fetchSearchResults(query, category, page + 1)}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
}

export default function SearchResults({
  searchResults,
  isLoading,
  totalResults,
  query,
  page,
  category,
  fetchSearchResults
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {renderSearchResults(
        searchResults,
        isLoading,
        totalResults,
        query,
        page,
        category,
        fetchSearchResults,
        classes
      )}
    </div>
  );
}
