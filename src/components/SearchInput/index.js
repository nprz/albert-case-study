import { connect } from "react-redux";
import SearchInput from "./SearchInput";
import { fetchSearch } from "redux/actionCreators/search";
import { fetchSearchResults } from "redux/actionCreators/searchResults";

function processResults(results) {
  return results.map(result => ({
    author: result.author_name && result.author_name.join(", "),
    title: result.title,
    link: result.seed[0]
  }));
}

const mapStateToProps = state => {
  const { results, isFetching } = state.search;

  return {
    isLoading: isFetching,
    results: processResults(results)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSearch: (value, category) => dispatch(fetchSearch(value, category)),
  fetchSearchResults: (value, category, page) =>
    dispatch(fetchSearchResults(value, category, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
