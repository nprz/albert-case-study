import {
  REQUEST_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS_SUCCESS
} from "redux/actions/searchResults";

function searchResults(
  state = {
    isFetching: false,
    results: [],
    totalResults: null,
    page: null,
    category: null,
    query: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.results.docs,
        totalResults: action.results.numFound,
        query: action.query,
        page: action.page,
        category: action.category,
        isFetching: false
      };
    // case REQUEST_SEARCH_RESULTS_ERROR:
    default:
      return state;
  }
}

export default searchResults;
