import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createPost } from "../../../actions/posts";
import { useSelector } from "react-redux";

const Tweet = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ tweet: "", image: "", video: "" });
  const [width, setWidth] = useState("100");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.tweet || formData.image) {
      dispatch(createPost(user._id, formData));
      setFormData({ tweet: "", image: "", video: "" });
    }
  };

  const deleteImage = () => {
    setFormData({ ...formData, image: "" });
  };

  const handleChange = (e) => {
    console.log(formData);
    if (e.target.name === "image") {
      const name = e.target.name;
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        setFormData({
          ...formData,
          [name]: e.target.result,
        });
      };
    } else if (e.target.name === "tweet") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
      const mywidth = Math.floor((1 - formData.tweet.length / 160) * 100);
      setWidth(mywidth);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <Wrap>
      <div>
        {" "}
        <div className="avatar">
          {user?.avatar ? (
            <>
              <img src={user.avatar} alt={"user "} />
            </>
          ) : (
            <i className="fa fa-user"></i>
          )}
        </div>
      </div>
      <div className="right">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <textarea
            placeholder="What's happening?"
            type="text"
            name="tweet"
            value={formData.tweet}
            maxLength="160"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {formData?.image?.length > 0 && (
            <PhotoPreview>
              <img src={formData.image} alt="" />
              <i
                className="fal fa-times"
                onClick={() => {
                  deleteImage();
                }}
              ></i>

              <button>Edit</button>
            </PhotoPreview>
          )}
          <div className="bottom">
            <label htmlFor="photo">
              <i className="fal fa-images"></i>
            </label>
            <input
              type="file"
              id="photo"
              name="image"
              // value={formData.image}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="video">
              <i className="fal fa-video"></i>
            </label>
            <input
              type="file"
              id="video"
              name="video"
              // value={formData.video}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <i className="fal fa-grin"></i>
            <i className="fa fa-poll-h"></i>
            <div className="alighnRight">
              <Progress width={width}>
                <div></div>
              </Progress>
              <button>Tweet</button>
            </div>
          </div>
        </form>
      </div>
    </Wrap>
  );
};

export default Tweet;

const Progress = styled.div`
  display: block;
  height: 2px;
  border: none;
  outline: none;
  pointer-events: none;
  margin-right: 15px;
  width: 70px;
  border-radius: 100px;
  background: var(--borderLight);
  > div {
    border-radius: 100px;
    background: var(--primaryColor);
    width: ${(props) => props.width + "%"};
    height: 100%;
  }
`;

const PhotoPreview = styled.div`
  display: flex;

  grid-gap: 5px;
  background: var(--borderLight);
  /* padding: 10px; */
  min-height: 300px;
  margin: 20px 15px;
  overflow: hidden;
  border-radius: 13px;
  position: relative;

  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 13px;

  .fa-times {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    width: 25px;
    height: 25px;
    padding: 2px;
    cursor: pointer;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2%;
    left: 1%;
  }
  img {
    /* display: grid; */

    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    display: grid;
    overflow: hidden;

    &:nth-child(1) {
      grid-area: "1";
    }
    &:nth-child(2) {
      grid-area: "2";
    }
    &:nth-child(3) {
      grid-area: "3";
    }
    &:nth-child(4) {
      grid-area: "4";
    }
  }

  > button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    padding: 2px 4px;
    min-width: 70px;
    color: white;

    height: 35px;
    position: absolute;
    bottom: 3%;
    cursor: pointer;
    right: 2%;
    border-radius: 200px;
  }
`;

const Wrap = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  height: auto;
  display: flex;
  align-items: center;
  padding: 15px;
  .alighnRight {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .avatar {
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
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    /* min-height: 80%; */

    form {
      margin-left: 20px;
      width: 100%;
      /* min-height: 100%; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: fit-content;
      max-height: 80vh;

      .bottom {
        display: flex;
        align-items: center;
        button {
          border: none;
          width: 70px;
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
      textarea {
        display: flex;
        flex-grow: 1;
        /* align-items: center; */
        resize: none;
        width: 80%;
        max-height: 80vh;
        margin-bottom: 15px;

        outline: none;
        padding: 10px 0;
        &:focus {
          outline: 1px solid var(--borderLight);
        }
        &::-webkit-scrollbar {
          display: none;
        }
        /* padding: 0 10px; */

        /* padding: auto; */
        border: none;
      }
    }
  }
`;
