import {
  REQUEST_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS_SUCCESS,
  REQUEST_SEARCH_RESULTS_ERROR
} from "redux/actions/searchResults";

function searchResults(
  state = {
    isFetching: false,
    results: [],
    totalResults: null,
    page: null,
    category: null,
    query: null,
    error: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: true,
        error: false
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
    case REQUEST_SEARCH_RESULTS_ERROR:
      return {
        ...state,
        error: true,
        isFetching: false
      };
    default:
      return state;
  }
}

export default searchResults;
