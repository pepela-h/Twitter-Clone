import React from "react";
import Posts from "../Posts/Posts";
import styled from "styled-components";
import Navbar from "./NavBar";
import Tweet from "./Tweet";
const feed = () => {
  return (
    <Wrap>
      <Navbar />

      <Scrollable>
        <Tweet />
        <Posts />
      </Scrollable>
    </Wrap>
  );
};

export default feed;

const Wrap = styled.div`
  border-right: 1px solid;
  border-color: var(--borderLight);
  overflow: hidden;
  min-height: 100vh;
`;

const Scrollable = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 40px);
  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background: var(--borderLight);
    border-radius: 200px;
  }
`;
