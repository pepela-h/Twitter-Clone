import React from "react";
import Button from "./Button";
import styled from "styled-components";

const Index = ({ setLevel,formData }) => {
  return (
    <Wrap>
      <div className="formContainer">
        <div className="top">
          <i
            className="fa fa-long-arrow-left"
            onClick={() => {
              setLevel((level) => level - 1);
            }}
          ></i>
          <h5>Step 2 of 5</h5>
        </div>
        <h2>Customize your Experience</h2>
        <Forms>
          <Row>
            <h3>Track whre you see Twitter content across the wiv</h3>
            <div>
              Twitter uses this data to personalize your experience. This web
              browsing history will never be stored with your name, email, or
              phone number.
              <input type="checkbox" />
            </div>
          </Row>
          <Row>
            <p>
              By signing up you agree to our{" "}
              <span>Terms, Privacy Policy, </span> and <span>Cookie Use</span>.
              Twitter may use your contact information, including your email
              address and phone number for purposes outlined in our Privacy
              Policy. <span>Learn More</span>
            </p>
          </Row>
        </Forms>{" "}
        <div style={{ width: "300px" }}>
          {" "}
          <Button color="white" background="black">
            <div
              onClick={() => {
               
                  setLevel((level) => level + 1);
                
              }}
            >
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
  > div {
    display: flex;
    p {
      flex: 1;
    }
  }
  input {
    border: 1px solid;
    border-color: var(--borderLight);
    border-radius: 5px;
    background-color: var(--primaryColor);
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
        margin-right: 30px;
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
