import * as constants from "../constants/constants";
import * as api from "../api";

export const createUser = (formData,navigate) => async (dispatch) => {
  const data = await api.createUser(formData,navigate);
  dispatch({
    type: constants.SIGN_UP,
    payload: data,
  });
};
export const loginUser = (formData,navigate) => async (dispatch) => {
  const data = await api.loginUser(formData,navigate);
  dispatch({
    type: constants.SIGN_IN,
    payload: data,
  });
};
