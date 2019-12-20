import superagent from "superagent";
import {
  REQUEST_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS_SUCCESS,
  REQUEST_SEARCH_RESULTS_ERROR
} from "redux/actions/searchResults";

function requestSearchResults() {
  return {
    type: REQUEST_SEARCH_RESULTS
  };
}

function receiveSearchResults(results, query, page, category) {
  return {
    type: REQUEST_SEARCH_RESULTS_SUCCESS,
    results,
    query,
    page,
    category
  };
}

function receiveSearchResultsError(query) {
  return {
    type: REQUEST_SEARCH_RESULTS_ERROR,
    query
  };
}

export function fetchSearchResults(q, category, page) {
  return function(dispatch) {
    dispatch(requestSearchResults());

    const query = {
      q,
      limit: 10,
      mode: "ebooks",
      page
    };

    if (category !== "all") {
      query.q = `${category}:"${q}"`;
    }

    superagent
      .get(`https://openlibrary.org/search.json`)
      .query(query)
      .then(res => {
        dispatch(receiveSearchResults(JSON.parse(res.text), q, page, category));
      })
      .catch(err => {
        dispatch(receiveSearchResultsError(q));
      });
  };
}
