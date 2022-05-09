import React from "react";
import Button from "./Button";
import styled from "styled-components";

const Index = ({ setLevel, setFormData, formData }) => {
  const handleChange = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setFormData({
        ...formData,
        avatar: e.target.result,
      });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Wrap>
      <div className="formContainer">
        <div className="top">
          {/* <i className="fa fa-long-arrow-left" onClick={()=>{setLevel(level=>level-1)}}></i> */}
          <i className="fab fa-twitter twitter"></i>
        </div>
        <h2>Choose a profile picture</h2>
        <p></p>
        <Forms onSubmit={handleSubmit}>
          <Row img={formData.avatar}>
            <label htmlFor="file">
              <div className="canvas">
                {formData.avatar.length ? (
                  <img src={formData.avatar} alt="" />
                ) : (
                  <div className="avatar">
                    <i className="fa fa-user"></i>
                    <i className="fal fa-camera"></i>
                  </div>
                )}
              </div>
            </label>
            <input
              id="file"
              type="file"
              min={8}
              name="avatar"
              onChange={handleChange}
            />
          </Row>
        </Forms>{" "}
        <div style={{ width: "300px" }}>
          {" "}
          <Button
            color="white"
            background="black"
            disabled={formData.length === 0}
          >
            <div onClick={() => setLevel((level) => level + 1)}>
              <span>
                {formData.avatar.length > 0 ? "Next" : "Skip for now"}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </Wrap>
  );
};

export default Index;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  label {
    width: 100%;
    min-height: 300px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .canvas {
      display: grid;
      object-fit: contain;
      overflow: hidden;
      max-height: 400px;
      img {
        display: grid;
        object-fit: contain;
        object-position: center;
        width: 100%;
      }
    }
    .avatar {
      background: var(--borderLight);
      height: 100px;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      .fa-camera {
        position: absolute;
        color: black !important;
        font-size: var(--textFont-xlg);
      }
      i {
        font-size: 90px;
        transform: translateY(10%);
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  h6 {
    cursor: pointer;
    color: var(--primaryColor);
  }
  input {
    display: none;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  align-items: flex-start;
  padding-top: 100px;
  justify-content: center;
  > .formContainer {
    width: 300px;
    > .top {
      width: 100%;
      display: flex;
      align-items: center;
      .fa-long-arrow-left {
        font-weight: 350;
        cursor: pointer;
      }
      .twitter {
        font-size: var(--textFont-xxlg);
        color: var(--primaryColor);
        align-self: center;
        margin: auto;
      }
    }
  }
`;
const Forms = styled.form`
  p {
    font-size: var(--text-font-ssm) !important;
  }
  width: 100%;
  font-size: var(--textFont-xsm);
  button {
    span {
      font-size: var(--textFont-sm);
    }
  }
  p {
    margin: 5px 0;
    span {
      color: var(--primaryColor);
      cursor: pointer;
    }
  }
  h6 {
    text-align: center;
    font-size: 12px;
  }
  h5 {
    font-size: var(--textFont-md);
  }
`;
