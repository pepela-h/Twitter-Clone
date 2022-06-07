import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <Wrap>
      <h6>Messages</h6>
      <div>
        <i className="fal fa-cog"></i>
        <i className="fal fa-envelope"></i>
     </div>
    </Wrap>
  );
};

export default NavBar;

const Wrap = styled.div`
  /* border-bottom: 1px solid; */
  border-color: var(--borderLight);
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: var(--texFont-lg);
  justify-content: space-between;
  div{
    display:flex;
    align-items: center;
    i{
      margin:0 3px;
    }
  }
  h6 {
    font-size: var(--texFont-md);
    cursor: pointer;
  }
`;
