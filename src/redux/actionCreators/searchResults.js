import superagent from "superagent";
import {
  REQUEST_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS_SUCCESS
} from "redux/actions/searchResults";

function requestSearchResults() {
  return {
    type: REQUEST_SEARCH_RESULTS
  };
}

function receiveSearchResults(results) {
  return {
    type: REQUEST_SEARCH_RESULTS_SUCCESS,
    results
  };
}

export function fetchSearchResults(q, category, page) {
  return function(dispatch) {
    dispatch(requestSearchResults());

    // TODO: make sure this query is correct
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
        // time stamps are a better solution, forward and backward
        dispatch(receiveSearchResults(JSON.parse(res.text)));
      });
  };
}
