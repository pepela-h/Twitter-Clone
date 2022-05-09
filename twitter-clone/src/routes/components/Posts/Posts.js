import React, { useCallback, useEffect, useRef, useState } from "react";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts } from "../../../actions/posts";
import { fetchMorePosts } from "../../../actions/posts";
const Posts = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  useEffect(() => {
    hasMore && dispatch(fetchMorePosts(setHasMore, setLoading, page));
  }, [dispatch, page, hasMore]);
  const lastBookEl = useCallback(
    (node) => {
      if (loading) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          setPage((page) => page + 1);
          observer.current.disconnect();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  const posts = useSelector((state) => state.posts);

  return (
    <>
      {!posts.length ? (
        <div style={{ padding: "15px" }}>No posts to display...</div>
      ) : (
        posts.map((post, i) => {
          return i === posts.length - 1 ? (
            <Post key={i} post={post} innerRef={lastBookEl}>
              {loading && "Loading..."}
            </Post>
          ) : (
            <Post key={i} post={post} />
          );
        })
      )}
    </>
  );
};

export default Posts;
