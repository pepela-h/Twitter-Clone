import * as constants from "../constants/constants";
export const userReducers = (state = {}, action) => {
  state = JSON.parse(localStorage.getItem("profile")) || state;
  switch (action.type) {
    case constants.SIGN_OUT:

      localStorage.clear()
      return  {};
    case constants.SIGN_UP:
    case constants.SIGN_IN:
      if (action.payload)
        localStorage.setItem("profile", JSON.stringify(action.payload));
      return action.payload === undefined ? state : action.payload;
    default:
      return state;
  }
};
