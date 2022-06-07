import * as constants from "../constants/constants";
import * as api from "../api";

export const fetchPosts =
  (setLoadng, params = null) =>
  async (dispatch) => {
    setLoadng(true);
    const data = await api.fetchPosts(params);
    setLoadng(false);
    dispatch({
      type: constants.FETCHPOSTS,
      payload: data,
    });
  };
//setHasMore, setLoading, page,user,parameters
//setHasMore, setLoading, page

export const handlePolls = (userChoice, postId) => async (dispatch) => {
  const data = await api.handlePolls(userChoice, postId);
  dispatch({type:constants.HANDLEPOLLS, payload:data});
};
export const fetchMorePosts =
  (setHasMore, setLoadng, page = 0, user = null, parameters = "",limit = 3) =>
  async (dispatch) => {
    const params = `page=${page}&limit=${limit}&user=${user}&search=${parameters.replace("#", "%23")}`;
    console.log(params);
    setLoadng(true);
    const data = await api.fetchMorePosts(params);
    setHasMore(data.hasMore);
    setLoadng(false);
    dispatch({
      type: constants.FETCHMOREPOSTS,
      payload: data.posts,
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

export const retweetPost =
  (postId, userId, comment = null) =>
  async (dispatch) => {
    const data = await api.retweetPost(postId, userId, comment);
    dispatch({
      type: constants.RETWEETPOST,
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

export const clearPosts = () => async (dispatch) => {
  dispatch({ type: constants.CLEARPOSTS });
};
