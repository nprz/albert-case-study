import { connect } from "react-redux";
import SearchResults from "./SearchResults";

function processResults(results) {
  return results.map(result => ({
    author: result.author_name && result.author_name.join(", "),
    title: result.title,
    link: result.seed[0]
  }));
}

const mapStateToProps = state => {
  return {
    searchResults: processResults(state.searchResults.results)
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
