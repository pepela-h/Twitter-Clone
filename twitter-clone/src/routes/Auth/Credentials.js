import React from "react";
import Button from "./Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Index = ({ setLevel, setFormData, formData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phoneNumber && formData.DOB) {
      sessionStorage.setItem("cred", JSON.stringify(formData));
    }
  };
  return (
    <Wrap>
      <div className="formContainer">
        <div className="top">
          <Link to="/auth">
            <i className="fal fa-times"></i>
          </Link>
          <i className="fab fa-twitter twitter"></i>
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
              type="text"
              placeholder="Phone"
              name="phoneNumber"
              onChange={handleChange}
              value={formData.phoneNumber}
            />
          </Row>
          <h5>Date of birth</h5>
          <p>
            This will not be shown publicly. Confirm your own age, even if this
            is a business, apet or something else.
          </p>

          <Row>
            <input
              type="date"
              placeholder="Date of birth"
              onChange={handleChange}
              value={formData.DOB}
              name="DOB"
            />
          </Row>
        </Forms>{" "}
        <div style={{ width: "300px" }}>
          {" "}
          <Button color="white" background="black">
            <div
              onClick={() => {
                if (formData.name && formData.DOB && formData.phoneNumber) {
                  setLevel((level) => level + 1);
                }
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
