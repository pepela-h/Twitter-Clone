import React, { useState } from "react";
import styled from "styled-components";
import { retweetPost } from "../../../../actions/posts";
import { deletePost } from "../../../../actions/posts";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserHover from "../../UserHover/UserHover";
import { likePost } from "../../../../actions/posts";
const Post = ({ post, children, innerRef }) => {
  // console.log(post);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const isRetweet = post.isRetweet;
  const handleDelete = () => {
    dispatch(deletePost(userId, post?._id));
  };
  const userId = useSelector((state) => state.user._id);
  // const hasLiked = post.likes.indexOf(userId) !== -1;
  // const hasRetweeted = post.retweets.indexOf(userId) !== -1;

  const [hasLiked, setHasLiked] = useState(post.likes.indexOf(userId) !== -1);
  const [hasRetweeted, sethasRetweeted] = useState(
    post.retweets.indexOf(userId) !== -1
  );

  return (
    <Wrap ref={innerRef}>
      <Left>
        <div className="avatar">
          <i className="fa fa-user"></i>
        </div>
      </Left>
      <Right isRetweet={isRetweet}>
        {isRetweet && (
          <div className="retTop" style={{ marginBottom: "10px" }}>
            <p className="retweeted">{post?.retweetUsername} retweeted</p>
            {post.reTweetComment && (
              <div className="top" style={{ padding: " 3px 0" }}>
                <h6 style={{ padding: " 3px 0" }}>{post?.creator} </h6>

                <div
                  className="hover"
                  onMouseLeave={() => {
                    setShow(false);
                  }}
                  onMouseEnter={() => {
                    setShow(true);
                  }}
                >
                  <Link to="/">{post?.retweetUsername}</Link>
                  {show && (
                    <UserHover
                      style={{ display: "none" }}
                      show={show}
                      username={post?.retweetUsername}
                    ></UserHover>
                  )}
                </div>
                <p>15m</p>
                <i
                  className="fa fa-ellipsis-h"
                  onClick={() => {
                    setToggle((state) => !state);
                  }}
                >
                  {toggle && (
                    <span>
                      <h6>Report</h6>
                      <h6 className="alert" onClick={handleDelete}>
                        Delete
                      </h6>
                    </span>
                  )}
                </i>
              </div>
            )}
            {post?.comment && <p>{post?.comment}</p>}
          </div>
        )}
        <div className="border">
          <div className="top">
            <h6>{post?.owner || "pepela John"} </h6>

            <div
              className="hover"
              onMouseLeave={() => {
                setShow(false);
              }}
              onMouseEnter={() => {
                setShow(true);
              }}
            >
              <Link to="/">{post?.username || "pepelamwenyewe"}</Link>
              <UserHover show={show} username={post?.username}></UserHover>
            </div>

            <p>15m</p>
            {!isRetweet && (
              <i
                className="fa fa-ellipsis-h"
                onClick={() => {
                  setToggle((state) => !state);
                }}
              >
                {toggle && (
                  <span>
                    <h6>Report</h6>
                    <h6 className="alert" onClick={handleDelete}>
                      Delete
                    </h6>
                  </span>
                )}
              </i>
            )}
          </div>
          <Description isRetweet={isRetweet} hasComment={!!post.reTweetComment}>
            {post?.tweet && <p>{post?.tweet}</p>}
          </Description>
          {post?.image && post?.image !== "" && (
            <Image>
              <img src={post?.image} alt="" />
            </Image>
          )}
        </div>
        <div className="toolBar">
          <i className="fal fa-comment">
            <span>2</span>
          </i>
          <i
            className={hasRetweeted ? "fa fa-retweet" : "fal fa-retweet"}
            style={{ color: hasRetweeted ? "#00ba7c" : "black" }}
            onClick={() => {
              sethasRetweeted(true);
              dispatch(retweetPost(post?._id, userId));
            }}
          >
            <span>{post?.retweets?.length}</span>
          </i>
          <i
            className={hasLiked ? "fa fa-heart" : "fal fa-heart"}
            style={{ color: hasLiked ? "#f6187f" : "black" }}
            onClick={() => {
              setHasLiked((state) => !state);
              dispatch(likePost(userId, post._id));
            }}
          >
            <span>{post?.likes?.length}</span>
          </i>
          <i className="fal fa-share-alt"></i>
        </div>
      </Right>

      <div className="abs">{children && children}</div>
    </Wrap>
  );
};

export default Post;

const Wrap = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  display: flex;
  align-items: flex-start;
  padding: 15px;
  position: relative;

  i {
    transition: color 0.3s ease;
  }

  .fa-heart {
    &:hover {
      color: #f6187f !important;
    }
  }
  .fa-retweet {
    &:hover {
      color: #00ba7c !important;
    }
  }
  .fa-comment,
  .fa-share-alt {
    &:hover {
      color: #2096ff !important;
    }
  }
  .hover {
    position: relative;
    display: flex;
    align-items: center;
    &:hover > div {
      display: flex;
    }
  }
  .abs {
    position: absolute;
    bottom: -20px;
    display: block;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Left = styled.div`
  /* display:flex; */
  height: 100%;
  flex: 0.08;
  > .avatar {
    background: var(--borderLight);
    flex: 0.08;
    height: 50px !important;
    width: 50px !important;
    border-radius: 50% !important;
    /* padding: 2px; */
    display: flex;
    /* flex-grow: 0; */
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: auto;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  .retTop {
    .retweeted {
      opacity: 0.7;
      font-size: var(--textFont-ssm);
      margin-bottom: 5px;
      display: block;
    }
  }
  .border {
    flex-shrink: 0;
    outline: ${(props) =>
      props.isRetweet && props.hasComment
        ? "2px solid var(--borderLight)"
        : "none"};
    border-radius: ${(props) => (props.isRetweet ? "15px" : "none")};
  }
  .toolBar {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 5px 0 5px;
    justify-content: space-between;
    i {
      cursor: pointer;
      font-size: var(--textfont-md);
      span {
        margin-left: 5px;
        font-size: var(--textFont-xsm);
      }
    }
  }
  .top {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding: ${(props) => (props.isRetweet ? "5px 8px 0 8px" : "none")};
    i {
      margin-left: auto;
      cursor: pointer;
      font-weight: 400;
      position: relative;
      span {
        right: 0;
        top: 15px;
        position: absolute;
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        z-index: 10;
        background: white;
        h6 {
          padding: 3px 0;
          margin: 2px 0;
          font-size: var(--textFont-sm);
          width: 100px;
        }
      }
    }
    a,
    p {
      font-size: var(--textFont-ssm);
    }
    a {
      font-weight: bold;
      margin: 0 3px;
      text-decoration: underline;
    }
  }
`;
const Image = styled.div`
  /* min-height: 200px; */
  border-radius: 15px;
  margin-top: 10px;
  display: grid;
  max-height: 450px;
  object-fit: contain;
  object-position: center;

  overflow: hidden;
  img {
    width: 100%;
  }
`;

const Description = styled.div`
  width: 90%;
  margin: 3px 0;
  padding: ${(props) => (props.isRetweet ? "0 8px" : "none")};
  p {
    font-size: var(--textFont-sm);
  }
`;
