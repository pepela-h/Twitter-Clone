import React from "react";
import Button from "./Button";
import styled from "styled-components";

const Index = ({ setLevel, setFormData, formData }) => {
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
          <i
            className="fa fa-long-arrow-left"
            onClick={() => {
              setLevel((level) => level - 1);
            }}
          ></i>
          <h5>Step 3 of 5</h5>
        </div>
        <h2>Create your account</h2>
        <Forms onSubmit={handleSubmit}>
          <Row>
            <input
              type="text"
              placeholder="Name"
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
          </Row>
          <Row>
            <input
              type="number"
              placeholder="Phone"
              name="phoneNumber"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
          </Row>
          <Row>
            <input
              type="date"
              placeholder="Date of birth"
              onChange={handleChange}
              value={formData.DOB}
              name="DOB"
            />
          </Row>
          <p>
            By Signing up, you agree to the <span>Terms of Service</span> and{" "}
            <span>Privacy Policy, </span> including <span>Cookie Use</span>.
            Twitter may use your coontact information, including your email
            address and phone number for purpose outlined in our Privacy Policy
            , like keeping your account secure and personalizing our services,
            including ads. <span>Learn more</span>. Others will be able to find
            you by email or phone number, when provided, unless you choose
            otherwise <span>here</span>.
          </p>
        </Forms>{" "}
        <div style={{ width: "300px" }}>
          <Button color="white" background="var(--primaryColor)">
            <div
              onClick={() => {
                if (formData.name && formData.DOB && formData.phoneNumber) {
                  setLevel((level) => level + 1);
                }
              }}
            >
              <span>Sign Up</span>
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
  input {
    width: 100%;
    height: 50px;
    border: 2px solid;
    border-color: var(--borderLight);
    border-radius: 5px;
    padding: 0 5px;
    &:focus {
      border: none;
      outline: 2px solid var(--primaryColor);
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
  padding-top: 100px;
  justify-content: center;
  h5 {
    margin-left: 30px;
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
