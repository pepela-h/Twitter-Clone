import { combineReducers } from "redux";
import { postReducer } from "./posts";
import { userReducers } from "./users";
export default combineReducers({
  posts: postReducer,
  user: userReducers,
});
