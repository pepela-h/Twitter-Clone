import React from "react";
import styled from "styled-components";
const Button = ({ color, background, children, clickEvent }) => {
  return (
    <Btn color={color} background={background} onClick={clickEvent || undefined} >
      {children}
    </Btn>
  );
};

export default Button;

const Btn = styled.button`
  /* padding: 5px; */
  overflow: hidden;
  width: 100%;
  height: 50px;
  border-radius: 100px;
  margin: 8px 0;
  border: 1px solid;
  border-color: var(--borderLight);
  > div {
    height: "100%";
    display: "flex";
    align-items: "center";
    justify-content: "center";
  }
  color: ${(props) => (props.color ? props.color : "inherit")};
  cursor: pointer;
  i {
    margin: 0 10px;
  }
  background: ${(props) =>
    props.background ? props.background : "transparent"};
  span {
    font-weight: bold;
  }
`;
