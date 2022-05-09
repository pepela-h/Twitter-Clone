import React from "react";
import Button from "./Button";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { createUser } from "../../actions/users";
import { useDispatch } from "react-redux";

const Index = ({ setFormData, formData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData, navigate));
    // navigate("/");
  };
  return (
    <Wrap>
      <div className="formContainer">
        <div className="top">
          {/* <i className="fa fa-long-arrow-left" onClick={()=>{setLevel(level=>level-1)}}></i> */}
          <i className="fab fa-twitter twitter"></i>
        </div>
        <h2>Describe yourself</h2>
        <p>
          What makes you special? Don't think too hard, just have fun with it.{" "}
        </p>
        <Forms onSubmit={handleSubmit}>
          <Row>
            <textarea
              placeholder="Your Bio"
              name="bio"
              onChange={handleChange}
              value={formData.bio}
            />
          </Row>
          <Button
            color="white"
            background="black"
            disabled={formData.length === 0}
          >
            <div>
              <span>
                {formData.bio.length > 0 ? "Continue" : "Skip for now"}
              </span>
            </div>
          </Button>
        </Forms>
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
  textarea {
    width: 100%;
    height: 100px;
    border: 2px solid;
    border-color: var(--borderLight);
    border-radius: 5px;
    padding: 5px;
    resize: none;
    font-size: var(--textFont-sm);
    &::placeholder {
      color: var(--primaryColor);
    }
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
