import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Leftbar = () => {
  return (
    <Wrap className={"Leftbars"}>
      <div className="head">
        <Link to="/">
          <i className="fab fa-twitter"></i>
        </Link>
      </div>
      <Row>
        <i className="icon fal fa-home-alt"></i>
        <h5>Home</h5>
      </Row>
      <Row>
        <i className="icon fal fa-search"></i>
        <h5>Explore</h5>
      </Row>

      <Row>
        <i className="icon fal fa-inbox"></i>
        <h5>Messages</h5>
      </Row>
      <Row>
        <i className="icon fal fa-bookmark"></i>
        <h5>Saved</h5>
      </Row>
      <Row>
        <i className="icon fal fa-list-alt"></i>
        <h5>Lists</h5>
      </Row>
      <Row>
        <i className="icon fal fa-user-alt"></i>
        <h5>Profile</h5>
      </Row>
      <Row>
        <i className="icon fal fa-ellipsis-h"></i>
        <h5>More</h5>
      </Row>
      <button>Tweet</button>
    </Wrap>
  );
};

export default Leftbar;

const Wrap = styled.div`
  height: 100vh;
  min-height: 400px;
  position: sticky;
  border: 1px solid;
  border-color: var(--borderLight);

  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .head {
    display: flex;
    align-items: center;
    font-size: 22px;
    padding: 15px 0;
    width: 150px;

    i {
      margin-right: auto !important;
      color: var(--primaryColor);
      font-size: var(--textFont-xxlg);
    }
  }
  button {
    border: none;
    width: 70%;
    height: 40px;
    border-radius: 400px;
    background-color: var(--primaryColor);
    margin-top: 50px;
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  justify-content: flex-end;
  cursor: pointer;
  padding: 15px 0;
  width: 150px;

  /* margin-left: auto; */

  h5 {
    width: 100px;
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
  .fa-ellipsis-h {
    border-radius: 50%;
    border: 1px solid black;
  }
  .icon {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    font-size: var(--textFont-xlg);
  }
`;
