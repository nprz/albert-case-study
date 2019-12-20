import superagent from "superagent";
import { REQUEST_SEARCH, REQUEST_SEARCH_SUCCESS } from "redux/actions/search";

function requestSearch(lastQuery) {
  return {
    type: REQUEST_SEARCH,
    lastQuery
  };
}

function receiveSearch(results, query) {
  return {
    type: REQUEST_SEARCH_SUCCESS,
    results,
    query
  };
}

export function fetchSearch(q, category) {
  return function(dispatch) {
    dispatch(requestSearch(q));

    const query = {
      q,
      limit: 10,
      mode: "ebooks"
    };

    if (category !== "all") {
      query.q = `${category}:"${q}"`;
    }

    superagent
      .get(`https://openlibrary.org/search.json`)
      .query(query)
      .then(res => {
        // time stamps are a better solution, forward and backward
        dispatch(receiveSearch(JSON.parse(res.text), q));
      });
  };
}
