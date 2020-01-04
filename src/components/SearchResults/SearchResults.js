import React from "react";
import PropTypes from "prop-types";

// Components
import SearchResultCard from "components/SearchResultCard";
import SearchResultErrorCard from "components/SearchResultErrorCard";
import Pagination from "components/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

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
    searchResultInfo: {
      width: "100%",
      marginBottom: 16
    }
  };
});

function renderSearchResults(searchResults) {
  return searchResults.map(result => (
    <SearchResultCard
      key={result.link}
      title={result.title}
      author={result.author}
      year={result.year}
      link={result.link}
    />
  ));
}

export default function SearchResults({
  searchResults,
  isLoading,
  totalResults,
  query,
  page,
  category,
  fetchSearchResults,
  error
}) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.root}>
        <SearchResultErrorCard
          fetchSearchResults={fetchSearchResults}
          query={query}
          category={category}
          page={page}
        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {query && (
        <div className={classes.searchResultInfo}>
          <Typography variant="body1">
            <b>{totalResults}</b> results for search query <b>"{query}"</b>
          </Typography>
        </div>
      )}
      {renderSearchResults(searchResults)}
      {query && (
        <Pagination
          fetchSearchResults={fetchSearchResults}
          totalResults={totalResults}
          query={query}
          category={category}
          page={page}
        />
      )}
    </div>
  );
}

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
};
