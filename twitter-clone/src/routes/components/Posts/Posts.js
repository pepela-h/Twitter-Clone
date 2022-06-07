import React, { useCallback, useEffect, useRef, useState } from "react";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { comentPost, fetchMorePosts } from "../../../actions/posts";
import { useLocation } from "react-router";
import { clearPosts } from "../../../actions/posts";
import { makeStyles } from "@mui/styles";
import CommentOnPost from "../Comments/CommentPost";
import { CircularProgress } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  loadingState: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Posts = () => {
  const classes = useStyles();

  const location = useLocation();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [show, setShowComment] = useState({ visible: false, parent: {} });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ image: "", comment: "" });
  const observer = useRef();

  useEffect(() => {
    dispatch(clearPosts());
  }, [location, dispatch]);
  useEffect(() => {
    hasMore && dispatch(fetchMorePosts(setHasMore, setLoading, page));
  }, [dispatch, page, hasMore]);

  const handleComment = (e) => {
    e.preventDefault();
    if (formData.comment.length && show.parent._id) {
      dispatch(comentPost(userId, show.parent._id, formData.comment));
      setShowComment({ visible: false, parent: {} });
      setFormData({ image: "", comment: "" });
    }
  };
  const lastBookEl = useCallback(
    (node) => {
      if (loading) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
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
  const userId = useSelector((state) => state.user._id);

  return (
    <>
      {posts.length ? (
        posts.map((post, i) => {
          return i === posts.length - 1 ? (
            <Post
              setShowComment={setShowComment}
              key={i}
              post={post}
              innerRef={lastBookEl}
            ></Post>
          ) : (
            <Post setShowComment={setShowComment} key={i} post={post} />
          );
        })
      ) : (
        <div style={{ padding: "15px" }}>
          {loading ? (
            <div className={classes.loadingState}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            "No Posts to display"
          )}
        </div>
      )}
      {show.visible && (
        <CommentOnPost
          setFormData={setFormData}
          handleComment={handleComment}
          setShowComment={setShowComment}
          show={show}
          formData={formData}
        />
      )}
    </>
  );
};

export default Posts;
