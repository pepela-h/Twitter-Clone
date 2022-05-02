import React from "react";
import Post from "./Post/Post";
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
  return (
    <>
      {myposts.map((post,i) => {
        return <Post key={i} image={post.image} description={post.description} />;
      })}
     
    </>
  );
};

export default Posts;


