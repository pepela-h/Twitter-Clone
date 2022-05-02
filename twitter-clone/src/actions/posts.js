import * as constants from "../constants/constants";
import * as api from "../api";

export const fetchPosts =
  (params = null) =>
  async (dispatch) => {
    const data = await api.fetchPosts(params);
    dispatch({
      type: constants.FETCHPOSTS,
      payload: data,
    });
  };
export const likePost = (userId, postId) => async (dispatch) => {
  const data = await api.likePost(userId, postId);
  dispatch({
    type: constants.LIKEPOST,
    payload: data,
  });
};
export const comentPost = (userId, postId, comment) => async (dispatch) => {
  const data = await api.commentPost(userId, postId, comment);
  dispatch({
    type: constants.COMMENTPOST,
    payload: data,
  });
};
export const deletePost = (userId, postId) => async (dispatch) => {
  const data = await api.deletePost(userId, postId);
  dispatch({
    type: constants.DELETEPOST,
    payload: data,
  });
};
export const createPost = (userId, postData) => async (dispatch) => {
  const data = await api.createPost(userId, postData);
  dispatch({
    type: constants.CREATEPOST,
    payload: data,
  });
};
