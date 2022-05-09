import React from "react";
import Button from "./Button";
import styled from "styled-components";

const Index = ({ setLevel, formData, setFormData }) => {
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
          <i className="fab fa-twitter twitter"></i>
        </div>
        <h2>Create a username</h2>
        <Forms onSubmit={handleSubmit}>
          <Row>
            <input
              type="text"
              placeholder="@username"
              onChange={handleChange}
              name="username"
              value={formData.username}
            />

            <h5>Didn't receive code?</h5>
          </Row>
        </Forms>{" "}
        <div style={{ width: "300px" }}>
          {" "}
          <Button
            color="white"
            background="black"
            disabled={formData.length === 0}
          >
            <div
              onClick={() => {
                if (formData.username) setLevel((level) => level + 1);
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
