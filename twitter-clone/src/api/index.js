import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3500",
  withCredentials: true,
  credentials: "include",
});
API.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const fetchProfile = async (username) => {
  try {
    const { data } = await API.get(`users/${username}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchPosts = async (params) => {
  try {
    const { data } = await API.get(`/posts?${params}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMorePosts = async (params) => {
  try {
    const { data } = await API.get(`/posts/more?${params}`);
    console.log(data.posts.length);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (userId, postId) => {
  try {
    const { data } = await API.post(`/posts/like/${postId}`, { userId });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const commentPost = async (userId, postId, comment) => {
  try {
    const { data } = await API.post(`/posts/comment/${postId}`, {
      userId,
      comment,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (userId, postId) => {
  try {
    const { data } = await API.delete(`/posts/delete/${postId}`, { userId });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async (userId, postData) => {
  try {
    const { data } = await API.post(`/posts`, { userId, postData });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const retweetPost = async (postId, userId, comment) => {
  try {
    const { data } = await API.post(`/posts/retweet`, {
      postId,
      userId,
      comment,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (formData, navigate) => {
  try {
    const { data } = await API.post(`/users/signup`, { ...formData });
    // navigate("/");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (formData, navigate) => {
  try {
    const { data } = await API.post(`/users/signin`, { ...formData });
    // navigate("/");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (id) => {
  try {
    await API.post("/refresh", { id });
    return;
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};
