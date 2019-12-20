import { connect } from "react-redux";
import SearchResults from "./SearchResults";
import { fetchSearchResults } from "redux/actionCreators/searchResults";

function processResults(results) {
  return results.map(result => ({
    author: result.author_name && result.author_name.join(", "),
    title: result.title,
    link: result.key,
    year: result.first_publish_year
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
