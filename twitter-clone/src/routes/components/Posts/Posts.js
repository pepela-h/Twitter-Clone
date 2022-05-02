import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../actions/posts";
const Posts = () => {
  const myposts = [
    {
      image: "",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quos eligendi quisquam sit repudiandae voluptatum iure maiores, labore aperiam esse?",
    },
    {
      image: "1.jpg",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quos eligendi quisquam sit repudiandae voluptatum iure maiores, labore aperiam esse?",
    },
    {
      image: "2.jpg",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quos eligendi quisquam sit repudiandae voluptatum iure maiores, labore aperiam esse?",
    },
    {
      image: "3.jpg",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quos eligendi quisquam sit repudiandae voluptatum iure maiores, labore aperiam esse?",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      {myposts.map((post, i) => {
        return (
          <Post key={i} image={post.image} description={post.description} />
        );
      })}
    </>
  );
};

export default Posts;
