import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createPost } from "../../../actions/posts";
const Tweet = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ tweet: "", image: "",video:"" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.tweet || formData.image) {
      dispatch(createPost(232323, formData));
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image" || e.target.name === "video") {
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.result,
        });
      };
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
          <i className="fa fa-user"></i>
        </div>
      </div>
      <div className="right">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            placeholder="What's happening?"
            type="text"
            name="tweet"
            value={formData.tweet}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className="bottom">
            <label htmlFor="photo">
              <i className="fal fa-images"></i>
            </label>
            <input
              type="file"
              id="photo"
              name="image"
              value={formData.image}
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
              value={formData.video}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <i className="fal fa-grin"></i>
            <button>Tweet</button>
          </div>
        </form>
      </div>
    </Wrap>
  );
};

export default Tweet;

const Wrap = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 15px;
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
  }
  .right {
    flex: 1;
    height: 80%;

    form {
      margin-left: 20px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

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
      input {
        height: auto;
        display: flex;
        align-items: center;
        resize: none;
        width: 80%;
        outline: none;

        /* padding: auto; */
        border: none;
      }
    }
  }
`;
