import { REQUEST_SEARCH, REQUEST_SEARCH_SUCCESS } from "redux/actions/search";

function searchResults(
  state = {
    isFetching: false,
    results: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_SEARCH_SUCCESS:
      return {
        ...state,
        results: action.results.docs,
        isFetching: false
      };
    // case: REQUEST_SEARCH_ERROR:
    default:
      return state;
  }
}

export default searchResults;
