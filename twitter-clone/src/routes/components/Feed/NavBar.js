import React from "react";
import styled from "styled-components";
import Svg from "../Svg";
const NavBar = () => {
  return (
    <Wrap>
      <h6>Home</h6>
      <Svg/>
    </Wrap>
  );
};

export default NavBar;

const Wrap = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: var(--texFont-lg);
  justify-content: space-between;
  h6 {
    font-size: var(--texFont-md);
    cursor: pointer;
  }
`;
