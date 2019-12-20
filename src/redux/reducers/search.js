import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_ERROR
} from "redux/actions/search";

function search(
  state = {
    isFetching: false,
    results: [],
    lastQuery: null,
    error: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true,
        error: false,
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
    case REQUEST_SEARCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}

export default search;
