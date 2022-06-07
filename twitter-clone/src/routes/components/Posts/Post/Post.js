import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { retweetPost } from "../../../../actions/posts";
import { deletePost } from "../../../../actions/posts";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import UserHover from "../../UserHover/UserHover";
import { likePost } from "../../../../actions/posts";
// import { handlePolls } from "../../../../api";

import { fetchProfile } from "../../../../api";

import { handlePolls } from "../../../../actions/posts";
// import moment from "moment"
const Post = ({ post, children, innerRef, setShowComment }) => {
  const [show, setShow] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const isRetweet = post.isRetweet;
  const handleDelete = () => {
    dispatch(deletePost(userId, post?._id));
  };

  const handlePollSubmit = async (e, choice) => {
    e.preventDefault();
    // const data = await handlePolls(choice, post._id)
    dispatch(handlePolls(choice, post._id));
    // console.log(data)
  };
  const user = useSelector((state) => state.user);
  const userId = user._id;
  // const hasLiked = post.likes.indexOf(userId) !== -1;
  // const hasRetweeted = post.retweets.indexOf(userId) !== -1;

  // const divref = useRef(null);

  const [hasLiked, setHasLiked] = useState(post.likes.indexOf(userId) !== -1);
  const [hasRetweeted, sethasRetweeted] = useState(
    post.retweets.indexOf(userId) !== -1
  );
  let words = post.tweet.split(" ");
  if (post.tags.length) {
    words
      .map((word, i) => {
        return word.startsWith("#")
          ? (words[i] = `<span>${word}</span>`)
          : (words[i] = word);
      })
      .join(" ");
  }
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (post.isPoll) {
      let val = 0;

      Array.from(post.poll.choices).forEach((choice) => {
        val += choice.votes.length;
        setTotal(val);
      });
    }
    // eslint-disable-next-line
  }, [post.isPoll, post?.poll?.choices]);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    async function getProfilePic() {
      const username = post.isRetweet ? post.retweetUsername : post.username;
      const data = await fetchProfile(username, navigate, true);
      setProfilePic(data.avatar);
    }
    getProfilePic();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {(!post.isPoll ||
        (post.isPoll &&
          new Date(post.poll.exp).getMilliseconds() >
            new Date().getMilliseconds())) && (
        <Wrap ref={innerRef}>
          <Left>
            <div className="avatar">
              {profilePic.length ? (
                <img src={profilePic} alt="" />
              ) : (
                <i className="fa fa-user"></i>
              )}
            </div>
          </Left>
          <Right isRetweet={isRetweet}>
            {post.isPoll ? (
              <React.Fragment>
                <Border className="border">
                  <div className="top">
                    <h6>{post?.owner} </h6>

                    <div
                      className="hover"
                      onMouseLeave={() => {
                        setShow(false);
                      }}
                      onMouseEnter={() => {
                        setShow(true);
                      }}
                    >
                      <Link to={`/${post?.username}`}>{post?.username}</Link>
                      <UserHover
                        show={show}
                        username={post?.username}
                      ></UserHover>
                    </div>

                    <p>{}</p>
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
                  <div className="poll-cont">
                    <h5>
                      {post.poll.question +
                        `${post.poll.question.endsWith("?") ? "" : "?"}`}
                    </h5>

                    {post.poll.choices.map((choice, i) => {
                      let width = (choice?.votes?.length / total) * 100 || 1;

                      return (
                        <Pollout
                          className="poll-out"
                          key={i}
                          width={width}
                          onClick={(e) => {
                            handlePollSubmit(e, `choice${i + 1}`);
                            setShowPoll(true);
                          }}
                          showPoll={showPoll}
                        >
                          {!showPoll && <p>{choice[`choice${i + 1}`]}</p>}
                          <div className="pollin">
                            <div className="abs-div">
                              <p>{choice[`choice${i + 1}`]}</p>
                              <p>{Math.floor(width)}%</p>
                            </div>
                          </div>
                        </Pollout>
                      );
                    })}
                  </div>
                  <div className="toolBar">
                    <i
                      className="fal fa-comment"
                      onClick={() => {
                        setShowComment((show) => ({
                          ...show,
                          parent: post,
                          visible: true,
                        }));
                      }}
                    >
                      <span>
                        {post.comments.length > 0
                          ? `${post.comments.length} `
                          : ""}
                      </span>
                    </i>
                    <i
                      className={
                        hasRetweeted ? "fa fa-retweet" : "fal fa-retweet"
                      }
                      style={{ color: hasRetweeted ? "#00ba7c" : "black" }}
                      onClick={() => {
                        sethasRetweeted(true);
                        dispatch(retweetPost(post?._id, userId));
                      }}
                    >
                      <span>
                        {post.retweets.length > 0
                          ? `${post.retweets.length} `
                          : ""}
                      </span>
                    </i>
                    <i
                      className={hasLiked ? "fa fa-heart" : "fal fa-heart"}
                      style={{ color: hasLiked ? "#f6187f" : "black" }}
                      onClick={() => {
                        setHasLiked((state) => !state);
                        dispatch(likePost(userId, post._id));
                      }}
                    >
                      <span>
                        {post.likes.length > 0 ? `${post.likes.length} ` : ""}
                      </span>
                    </i>
                    <i className="fal fa-share-alt"></i>
                  </div>
                </Border>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {isRetweet && (
                  <div className="retTop" style={{ marginBottom: "10px" }}>
                    <p className="retweeted">
                      {post?.retweetUsername === user.username
                        ? "You"
                        : post?.retweetUsername}{" "}
                      retweeted
                      <i
                        className="fa fa-retweet"
                        style={{ marginLeft: 10 }}
                      ></i>
                    </p>
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
                    <h6>{post?.owner} </h6>

                    <div
                      className="hover"
                      onMouseLeave={() => {
                        setShow(false);
                      }}
                      onMouseEnter={() => {
                        setShow(true);
                      }}
                    >
                      <Link to={`/${post?.username}`}>{post?.username}</Link>
                      <UserHover
                        show={show}
                        username={post?.username}
                      ></UserHover>
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
                  <Description
                    isRetweet={isRetweet}
                    hasComment={!!post.reTweetComment}
                  >
                    {post?.tweet && (
                      <p>
                        {post.tags.length
                          ? post?.tweet.split(" ").map((row, i) =>
                              row.startsWith("#") ? (
                                <span
                                  key={i}
                                  onClick={() => {
                                    navigate(`/search?q=${row}`);
                                  }}
                                >
                                  {row + " "}
                                </span>
                              ) : (
                                `${row + " "}`
                              )
                            )
                          : post?.tweet}
                      </p>
                    )}
                  </Description>
                  {post?.image && post?.image !== "" && (
                    <Image>
                      <img src={post?.image} alt="" />
                    </Image>
                  )}
                </div>
                <div className="toolBar">
                  <i
                    className="fal fa-comment"
                    onClick={() => {
                      setShowComment((show) => ({
                        ...show,
                        parent: post,
                        visible: true,
                      }));
                    }}
                  >
                    <span>
                      {post.comments.length > 0
                        ? `${post.comments.length} `
                        : ""}
                    </span>
                  </i>
                  <i
                    className={
                      hasRetweeted ? "fa fa-retweet" : "fal fa-retweet"
                    }
                    style={{ color: hasRetweeted ? "#00ba7c" : "black" }}
                    onClick={() => {
                      sethasRetweeted(true);
                      dispatch(retweetPost(post?._id, userId));
                    }}
                  >
                    <span>
                      {post.retweets.length > 0
                        ? `${post.retweets.length} `
                        : ""}
                    </span>
                  </i>
                  <i
                    className={hasLiked ? "fa fa-heart" : "fal fa-heart"}
                    style={{ color: hasLiked ? "#f6187f" : "black" }}
                    onClick={() => {
                      setHasLiked((state) => !state);
                      dispatch(likePost(userId, post._id));
                    }}
                  >
                    <span>
                      {post.likes.length > 0 ? `${post.likes.length} ` : ""}
                    </span>
                  </i>
                  <i className="fal fa-share-alt"></i>
                </div>
              </React.Fragment>
            )}
          </Right>

          <div className="abs">{children && children}</div>
        </Wrap>
      )}
    </>
  );
};

export default Post;

const Pollout = styled.div`
  width: 100;
  height: 30px;
  border: 0.7px solid var(--borderLight);
  margin: 5px 0;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  > p {
    text-transform: capitalize;
    font-size: var(--textFont-ssm);
    margin-left: 15px;
  }
  .abs-div {
    font-size: var(--textFont-sm);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    p {
      text-transform: capitalize;
    }
  }

  > .pollin {
    width: ${(props) => props.width + "%"};
    height: 100%;
    display: ${(props) => (props.showPoll ? "flex" : "none")};
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
    flex-shrink: 0;
    background: rgba(0, 0, 0, 0.07);
  }
`;

const Border = styled.div`
  flex-shrink: 0;
  outline: ${(props) =>
    props.isRetweet && props.hasComment
      ? "2px solid var(--borderLight)"
      : "none"};
  border-radius: ${(props) => (props.isRetweet ? "15px" : "none")};

  .poll-out {
  }
`;

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
    bottom: -100px;
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
    overflow: hidden;
    i {
      color: grey;
      font-size: 30px;
      transform: translateY(10%);
    }
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
    span {
      font-size: var(--textFont-sm);
      color: var(--primaryColor);
      cursor: pointer;
    }
  }
`;
