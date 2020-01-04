import {
  REQUEST_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS_SUCCESS,
  REQUEST_SEARCH_RESULTS_ERROR
} from "redux/actions/searchResults";
import createReducer from "helpers/createReducer";

const initialState = {
  isFetching: false,
  results: [],
  totalResults: 0,
  page: 0,
  category: "all",
  query: "",
  error: false
};

const handlers = {
  [REQUEST_SEARCH_RESULTS]: (state, action) => {
    return {
      ...state,
      isFetching: true,
      error: false
    };
  },
  [REQUEST_SEARCH_RESULTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      results: action.results.docs,
      totalResults: action.results.numFound,
      query: action.query,
      page: action.page,
      category: action.category,
      isFetching: false
    };
  },
  [REQUEST_SEARCH_RESULTS_ERROR]: (state, action) => {
    return {
      ...state,
      error: true,
      query: action.query,
      isFetching: false
    };
  }
};

export default createReducer(initialState, handlers);
