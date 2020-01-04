import { connect } from "react-redux";
import SearchInput from "./SearchInput";
import { fetchSearch } from "redux/actionCreators/search";
import { fetchSearchResults } from "redux/actionCreators/searchResults";

// Helpers
import _get from "lodash/get";

function processResults(results) {
  return results.map(result => ({
    author: _get(result, "author_name", ["unknown"]).join(", "),
    title: _get(result, "title", "-"),
    link: _get(result, "key", "#")
  }));
}

const mapStateToProps = state => {
  const { results, isFetching, error } = state.search;

  return {
    isLoading: isFetching,
    results: processResults(results),
    error
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSearch: (value, category) => dispatch(fetchSearch(value, category)),
  fetchSearchResults: (value, category, page) =>
    dispatch(fetchSearchResults(value, category, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);

// TODO
// --- Separate out components ---
// -- wrap callbacks in useCallback (if needed) ---
// ---- update reducers to not use switch ----
// --- use the useDebounce hook ---
// add more info to README.md
// add prop types
