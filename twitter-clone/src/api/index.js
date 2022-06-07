import axios from "axios";
import Cookie from "js-cookie";
const API = axios.create({
  baseURL: "http://127.0.0.1:3500",
  withCredentials: true,
  credentials: "include",
});

const Cookies = Cookie.withAttributes({
  sameSite: "None",
  httpOnly: false,
  secure: true,
  expires: 10,
});
API.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const fetchProfile = async (username, navigate, params = undefined) => {
  try {
    const data = await API.get(`users/${username}?pic=${params}`);
    // console.log(data.status);

    return data.data;
  } catch (error) {
    if (error.response.status === 404 && !params) {
      navigate(`/NotFound`);
      return;
    }
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
    console.log(data);
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

export const handlePolls = async (userChoice, postId) => {
  try {
    const { data } = await API.post(`/posts/poll/${postId}`, { userChoice });

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

    if (data.refreshToken) {
      Cookies.set("jwt", data.refreshToken, {});
      Cookies.set("access", data.accessToken);
      // data.data.delete(data.accessToken);
      // data.data.delete(data.refreshToken);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (userId, followerId) => {
  try {
    const { data } = await API.post(`/users/follow/${followerId}`, { userId });
    // navigate("/");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export function getCookie(cookieName) {
  console.log(document.cookie, "hereeeeeeeeeee");
  const cookie = document.cookie
    .split(";")
    .find((row) => row.trim().startsWith(cookieName))
    .split("=")[1];
  return cookie;
}

export const loginUser = async (formData, navigate) => {
  try {
    const data = await API.post(`/users/signin`, { ...formData });

    if (data.status === 200) {
    }
    if (data.data.refreshToken) {
      console.log(data.data.refreshToken);

      Cookies.set("jwt", data.data.refreshToken, {});

      Cookies.set("access", data.data.accessToken);

      // data.data.delete(data.data.accessToken);
      // data.data.delete(data.data.refreshToken);
    }
    navigate("/");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async (userId, Cookie) => {
  try {
    const data = await API.post(`/users/signout`, { userId });

    if (data.status === 204) {
      Cookie?.remove("access", { path: "/" });
      Cookie?.remove("jwt", { path: "/refresh" });
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (id) => {
  try {
    const data = await API.post("/refresh", { id });
    if (data.data.refreshToken) {
      Cookies.set("jwt", data.data.refreshToken, {});

      Cookies.set("access", data.data.accessToken);
      console.log("refreshed");
    }
    return;
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};

export const getTags = async (limit = null, setLoading) => {
  try {
    const { data } = await API.get(`/posts/tags?limit=${limit}`);
    setLoading(false);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getNotifs = async () => {
  try {
    const { data } = await API.get("users/notifications");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = async (name, setCancelToken) => {
  try {
    const { data } = await API.get(`users/people?q=${name}`, {
      cancelToken: new axios.CancelToken((c) => setCancelToken(c)),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
