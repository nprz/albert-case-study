import { REQUEST_SEARCH, REQUEST_SEARCH_SUCCESS } from "redux/actions/search";

function search(
  state = {
    isFetching: false,
    results: [],
    lastQuery: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true,
        lastQuery: action.lastQuery
      };
    case REQUEST_SEARCH_SUCCESS:
      // Prevent late responding API calls from overwriting
      // most current API call
      if (state.lastQuery !== action.query) {
        return {
          ...state
        };
      }

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

export default search;
