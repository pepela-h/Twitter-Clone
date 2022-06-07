import React from "react";
import styled from "styled-components";
import { signOut } from "../actions/users";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Auth/Button";
import { useNavigate } from "react-router";

const Logout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(signOut(Cookies, user._id, navigate));
  };
  return (
    <Wrap>
      <div>
        <i className="fab fa-twitter"></i>
        <h4>Log out of Twitter?</h4>
        <p>
          You can always log back in at any time. If you just want to switch
          accounts, you can do that by adding an existing account.
        </p>
        <Button background="black" color="white" clickEvent={handleSignOut}>
          Logout
        </Button>
        <Button
          background="transparent"
          color="black"
          clickEvent={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
      </div>
    </Wrap>
  );
};

export default Logout;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    width: 300px;
    i {
      color: var(--primaryColor);
      font-size: 25px;
      margin:5px 0;
    }
    h4 {
      margin:5px 0;
      font-size: var(--textFont-md);
    }
    p {
      font-size: var(--textFont-sm);
      margin: 10px 0 30px 0;
    }
  }
`;
