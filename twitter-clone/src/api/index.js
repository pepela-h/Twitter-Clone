import axios from "axios";

const API = axios.create({baseURL: 'http://127.0.0.1:3500'})

export const fetchPosts = async (params) => {
  try {
    const { data } = await API.get(`/posts?${params}`);
    console.log("posts");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (userId, postId) => {
  try {
    const { data } = await API.post(`/posts/like/${postId}`, { userId });

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
