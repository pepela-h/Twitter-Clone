import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const CommentPost = ({
  setShowComment,
  show,
  handleComment,
  formData,
  setFormData,
}) => {
  console.log(show);
  return (
    <Wrap>
      <CommentForm>
        <div className="top">
          <i
            className="fal fa-times"
            onClick={() => setShowComment({ ...show, visible: false })}
          ></i>
        </div>
        <Bottom>
          <Left>
            <div className="avatar">
              <i className="fa fa-user"></i>
            </div>
          </Left>

          <Right>
            <div className="top" style={{ padding: " 3px 0" }}>
              <h6 style={{ padding: " 3px 0" }}>{show.parent.name} </h6>

              <div>
                <Link to="/">@{show?.parent?.username}</Link>
              </div>
              <p>15m</p>
            </div>

            <div className="tweet">
              <div>
                <p>{show.parent.tweet}</p>
              </div>
              <p>
                Replying to <span>@{show?.parent?.username}</span>
              </p>
            </div>
          </Right>
        </Bottom>

        <Bottom>
          <Left>
            <div className="avatar">
              <i className="fa fa-user"></i>
            </div>
          </Left>

          <Right>
            <form action="" id="commentForm" onSubmit={handleComment}>
              <textarea
                name="comment"
                id=""
                value={formData.comment}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Write Comment..."
              ></textarea>
            </form>
          </Right>
        </Bottom>

        <Bottom>
          <Left></Left>

          <Right>
            <div className="bottom">
              <label htmlFor="photo">
                <i className="fal fa-images"></i>
              </label>
              <input
                type="file"
                id="photo"
                name="image"
                // value={formData.image}
                onChange={(e) => {}}
              />
              <label htmlFor="video">
                <i className="fal fa-video"></i>
              </label>
              <input
                type="file"
                id="video"
                name="video"
                // value={formData.video}
                onChange={(e) => {}}
              />
              <i className="fal fa-grin"></i>
              <i className="fa fa-poll-h"></i>
              <div className="alighnRight">
                <button type="submit" form="commentForm">
                  Comment
                </button>
              </div>
            </div>
          </Right>
        </Bottom>
      </CommentForm>
    </Wrap>
  );
};

export default CommentPost;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  align-items: flex-start;
  justify-content: center;
  z-index: 102;
  .bottom {
    display: flex;
    align-items: center;
    .alighnRight {
      margin-left: auto;
    }
    button {
      border: none;
      width: 100px;
      height: 30px;
      border-radius: 400px;
      background-color: var(--primaryColor);
      margin-left: auto;
      margin-right: 15px;
      cursor: pointer;
    }
    i {
      margin: 0 5px;
      cursor: pointer;
      font-size: var(--texFont-lg);
      color: var(--primaryColor);
    }
    #photo {
      display: none;
    }
    #video {
      display: none;
    }
  }
`;

const CommentForm = styled.div`
  width: 600px;
  background: white;
  border-radius: 15px;
  margin-top: 50px;
  padding: 10px 15px;
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    i {
      cursor: pointer;
    }
  }
  form {
    width: 100%;
    textarea {
      resize: none;
      width: 100%;
      outline: none;
      border: none;
      height: auto;
    }
  }
`;
const Left = styled.div`
  /* display:flex; */
  height: 100%;
  flex: 0.04;
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
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  .tweet {
    display: flex;
    flex-direction: column;
    > p {
      font-size: var(--textFont-sm);
      opacity: 0.7;
      margin-bottom: 5px;
      span {
        color: var(--primaryColor);
        cursor: pointer;
      }
    }
    > div > p {
      font-size: var(--textFont-sm);
    }
  }
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
      display: flex;
      align-items: center;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px;
  position: relative;
`;
