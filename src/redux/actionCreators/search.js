import superagent from "superagent";
import { REQUEST_SEARCH, REQUEST_SEARCH_SUCCESS } from "redux/actions/search";

function requestSearch() {
  return {
    type: REQUEST_SEARCH
  };
}

function receiveSearch(results) {
  return {
    type: REQUEST_SEARCH_SUCCESS,
    results
  };
}

export function fetchSearch(query) {
  return function(dispatch) {
    dispatch(requestSearch());

    superagent
      .get(`https://openlibrary.org/search.json`)
      .query({ q: query, limit: 10 })
      .then(res => {
        dispatch(receiveSearch(JSON.parse(res.text)));
      });
  };
}
