import { connect } from "react-redux";
import SearchResults from "./SearchResults";
import { fetchSearchResults } from "redux/actionCreators/searchResults";

// Helpers
import _get from "lodash/get";

function processResults(results) {
  return results.map(result => ({
    author: _get(result, "author_name", ["unknown"]).join(", "),
    title: _get(result, "title", "-"),
    link: _get(result, "key", "#"),
    year: _get(result, "first_publish_year", "unknown")
  }));
}

const mapStateToProps = state => {
  const {
    results,
    totalResults,
    query,
    page,
    category,
    isFetching,
    error
  } = state.searchResults;

  return {
    totalResults,
    query,
    page,
    category,
    error,
    searchResults: processResults(results),

    isLoading: isFetching
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: (value, category, page) =>
    dispatch(fetchSearchResults(value, category, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
