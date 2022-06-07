import React, { useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import { loginUser } from "../../actions/users";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).length) {
      dispatch(loginUser(formData, navigate));
    }
  };
  return (
    <Wrap>
      <div className="formContainer">
        <div className="top">
          {/* <Link to="/auth">
            <i className="fal fa-times"></i>
          </Link> */}
          <i className="fab fa-twitter twitter"></i>
        </div>
        <h2>Create your account</h2>
        <Forms onSubmit={handleSubmit}>
          <Row>
            <input
              type="text"
              placeholder="username"
              onChange={handleChange}
              name="username"
              value={formData.username}
            />
            <p>use email instead</p>
          </Row>

          <Row>
            {" "}
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
          <Button color="white" background="black">
            <div>
              <span>Sign in</span>
            </div>
          </Button>
        </Forms>
        <Link to="/i/flow/signup">Don't have an account yet?</Link>
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
  > p {
    color: var(--primaryColor);
    font-size: var(--textFont-sm);
    justify-self: flex-end;

    margin-left: auto !important;
    cursor: pointer;

    width: fit-content;
  }
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
  input {
    width: 100%;
    height: 50px;
    border: 2px solid;
    border-color: var(--borderLight);
    border-radius: 5px;
    padding: 0 5px;
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
  a {
    width: 100%;
    font-size: var(--textFont-sm);
    color: var(--primaryColor);
    text-align: end !important;
  }
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
        font-size: var(--textFont-xlg);
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
