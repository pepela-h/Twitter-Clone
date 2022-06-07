import React, { useEffect } from "react";
import Button from "./Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [navigate, user?.username]);
  return (
    <Wrap>
      <div className="formContainer">
        <i className="fab fa-twitter"></i>
        <h2>Happening now</h2>
        <Forms>
          <Button>
            <span>Sign in with Google</span>
            <i className="fab fa-google"></i>
          </Button>
          <Button>
            <i className="fab fa-apple"></i>
            <span>Sign in with apple</span>
          </Button>
          <h6>or</h6>
          <Link to="/i/flow/signup">
            <Button color="white" background={"var(--primaryColor)"}>
              <span>Sign up with phone or email</span>
            </Button>
          </Link>
          <p>
            By signing up you agreee to the <span>Terms of service</span> and{" "}
            <span>Privacy Policy </span> including <span>Cookie Use</span>
          </p>
          <h5>Already have an account?</h5>
          <Link to="/i/flow/login">
            <Button color="var(--primaryColor)">
              <span>Sign in</span>
            </Button>
          </Link>
        </Forms>{" "}
      </div>
    </Wrap>
  );
};

export default Index;

// const CustomBtn = styled(Button)``
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
    > i {
      color: var(--primaryColor);
      font-size: var(--textFont-xxlg);
    }
  }
`;
const Forms = styled.div`
  width: 100%;
  font-size: var(--textFont-sm);
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
