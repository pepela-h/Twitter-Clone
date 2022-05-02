import React from "react";
import styled from "styled-components";
const RightBar = () => {
  return <Wrap>RightBar</Wrap>;
};

export default RightBar;
const Wrap = styled.div`
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  min-height: 400px;
  position: fixed;
`;
