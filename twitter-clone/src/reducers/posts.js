import * as constants from "../constants/constants";

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case constants.COMMENTPOST:
    case constants.LIKEPOST:
      let newState = state.map((post) =>
        post._id === action?.payload ? action?.payload : post
      );
      return action.payload === undefined ? state : newState;
    case constants.FETCHPOSTS:
      return action.payload === undefined ? state : action.payload;
    case constants.CREATEPOST:
      return action.payload === undefined ? state : [action.payload, ...state];
    case constants.DELETEPOST:
      let newStat = state.filter((post) => post._id === action?.payload);
      return action.payload === undefined ? state : newStat;
    default:
      return state;
  }
};
