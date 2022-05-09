import * as constants from "../constants/constants";

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case constants.FETCHMOREPOSTS:
      return action.payload === undefined || !action.payload
        ? state
        : [...state, ...action.payload];
    case constants.COMMENTPOST:
    case constants.LIKEPOST:
      let newState = state.map((post) =>
        post._id === action?.payload._id ? action?.payload : post
      );
      return action.payload === undefined || !action.payload ? state : newState;
    case constants.FETCHPOSTS:
      return action.payload === undefined || !action.payload
        ? state
        : action.payload;
    case constants.CREATEPOST:
    case constants.RETWEETPOST:
      return action.payload === undefined || !action.payload
        ? state
        : [action.payload, ...state];
    case constants.DELETEPOST:
      return !action.payload
        ? state
        : state.filter((post) => post._id !== action?.payload);
    default:
      return state;
  }
};
