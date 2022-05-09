import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

const Index = ({ setLevel, setFormData, formData }) => {
  const [showPw, setShowPw] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <h2>You'll need a password</h2>
        <p>Make sure it is 8-20 characters </p>
        <Forms onSubmit={handleSubmit}>
          <Row>
            <input
              type={`${showPw ? "text" : "password"}`}
              placeholder="Password"
              min={8}
              name="password"
              onChange={handleChange}
              value={formData.password}
            />

            <i
              className={`fa showpw ${showPw ? "fa-eye" : "fa-eye-slash"}`}
              onClick={() => setShowPw((state) => !state)}
            ></i>
          </Row>
        </Forms>{" "}
        <div style={{ width: "300px" }}>
          {" "}
          <Button
            color="white"
            background="black"
            disabled={formData.length === 0}
          >
            <div onClick={() =>{ if (formData.password) setLevel((level) => Number(level) + 1);}}>
              <span>Next</span>
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
  position: relative;
  .showpw {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h6 {
    cursor: pointer;
    color: var(--primaryColor);
  }
  input {
    width: 100%;
    height: 50px;
    border: 2px solid;
    border-color: var(--borderLight);
    border-radius: 5px;
    padding: 0 5px;
    &:focus {
      outline: 2px solid var(--primaryColor);
      border: none;
      border: none;
    }
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
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
