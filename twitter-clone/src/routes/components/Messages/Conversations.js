import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Scroll from "../Scroll";
const Conversations = () => {
  return (
    <Wrap>
      <Nav />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" placeholder="Search Conversations..." />
      </form>
      <Scroll>
        <Individ>
          <div className="avatar">
            <i className="fa fa-user"></i>
          </div>

          <div className="userMS">
            <div>
              <h6>Dave Gray</h6>
              <p>
                Hey I was not going to tell you what to do yesterday but I just
                had to because something really terrible came up and I couldn't
                help.'
              </p>
            </div>
          </div>
        </Individ>
      </Scroll>
    </Wrap>
  );
};

export default Conversations;

const Individ = styled.div`
  display: flex;
  padding: 0 15px;
  gap: 10px;
  .avatar {
    overflow: hidden;
    background: var(--borderLight);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 40px;
      transform: translateY(20%);
      color: grey;
    }
  }

  .userMS {
    flex: 1;
    display: flex;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      max-height: 40px;
      overflow: hidden;
      p {
        text-overflow: ellipsis;
        font-size: var(--textFont-ssm);
        width: 80%;

        &::target-text {
          color: red;
        }
      }
    }
  }
  position: relative;
  margin: 3px 0;
  &:after {
    position: absolute;
    width: 2px;
    content: "";
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primaryColor);
  }
`;
const Wrap = styled.div`
  border-right: 1px solid;
  border-color: var(--borderLight);
  overflow: hidden;
  min-height: 100vh;
  height: 100vh;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    input {
      width: 80%;
      border: none;
      outline: 1px solid var(--borderLight);
      height: 30px;
      border-radius: 20px;
      text-align: center;
      &::placeholder {
        position: relative;
        &:before {
          content: "f002";
          position: absolute;
          left: 0;
          height: 20px;
          width: 20px;
          top: calc(50% - 10px);
        }
      }
      &::placeholder:before {
        content: "f002";
        width: 20px;
        height: 20px;
      }
    }
  }
`;
