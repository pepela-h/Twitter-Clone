import React from 'react'
import styled from "styled-components";
const Scroll = ({ children }) => {
  return <Scrollable>{children}</Scrollable>;
};

export default Scroll
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