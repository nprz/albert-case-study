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

export function fetchSearch(q, category) {
  return function(dispatch) {
    dispatch(requestSearch());

    const query = {
      q,
      limit: 10,
      mode: "ebooks"
    };

    if (category !== "all") {
      console.log("h");
      query.q = `${category}:"${q}"`;
    }

    superagent
      .get(`https://openlibrary.org/search.json`)
      .query(query)
      .then(res => {
        // if previous q is a substring of current q ignore update
        // time stamps are a better solution, forward and backward
        dispatch(receiveSearch(JSON.parse(res.text)));
      });
  };
}
