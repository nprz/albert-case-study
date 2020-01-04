import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_ERROR
} from "redux/actions/search";
import createReducer from "helpers/createReducer";

const initialState = {
  isFetching: false,
  results: [],
  lastQuery: null,
  error: false
};

const handlers = {
  [REQUEST_SEARCH]: (state, action) => {
    return {
      ...state,
      isFetching: true,
      error: false,
      lastQuery: action.lastQuery
    };
  },
  [REQUEST_SEARCH_SUCCESS]: (state, action) => {
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
  },
  [REQUEST_SEARCH_ERROR]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      error: true
    };
  }
};

export default createReducer(initialState, handlers);
