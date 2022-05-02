import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combineReducers from "../reducers";

export const store = configureStore(
  {
    reducer: combineReducers,
  },
  compose(applyMiddleware(thunk))
);
