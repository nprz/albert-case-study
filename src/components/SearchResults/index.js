import { connect } from "react-redux";
import SearchResults from "./SearchResults";

function processResults(results) {
  return results.map(result => ({
    author: result.author_name && result.author_name.join(", "),
    title: result.title,
    link: result.key,
    year: result.first_publish_year
  }));
}

const mapStateToProps = state => {
  return {
    searchResults: processResults(state.searchResults.results),
    totalResults: state.searchResults.totalResults,
    isLoading: state.searchResults.isFetching
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
