import { combineReducers } from "redux";
import search from "redux/reducers/search";
import searchResults from "redux/reducers/searchResults";

export default combineReducers({
  search,
  searchResults
});
