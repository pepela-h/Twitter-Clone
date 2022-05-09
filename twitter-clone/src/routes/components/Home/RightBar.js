import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
// import { borderColor } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  rightBar: {
    background: theme.palette.primary.main[100],
    color: "#000000",

    height: "100%",
  },
  follow: {
    background: "transparent",
    color: theme.palette.primary.main,
    borderRadius: 50,
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    // padding: "2px 5px",
    minWidth: 80,
    height: 30,
    marginLeft: "auto",
    cursor: "pointer",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: "50%",
    background: "var(--borderLLight)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginRight: 10,
  },
  User: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
  },
}));
const RightBar = () => {
  const classes = useStyles();
  const people = ["Pepela John", "Ivyn Mugau", "Tess Ukumbi", "Legacy Otieno"];
  const [show, setShow] = useState(false);
  return (
    <Wrap className={classes.rightBar}>
      <form>
        <input type="text" />
        <i className="fa fa-search"></i>
      </form>
      <Contaier className="container">
        <Row>
          <h4>Maybe you may like</h4>
          {people.map((person, index) => {
            return !show ? (
              index < 2 ? (
                <div className={classes.User} key={index}>
                  <div className={classes.avatar}>
                    <i className="fa fa-user"></i>
                  </div>
                  <div className="user">
                    <h5>{person}</h5>
                    <h6>@pepela</h6>
                  </div>
                  <button className={classes.follow}>Follow</button>
                </div>
              ) : (
                ""
              )
            ) : (
              <div className={classes.User} key={index}>
                <div className={classes.avatar}>
                  <i className="fa fa-user"></i>
                </div>
                <div className="user">
                  <h5>{person}</h5>
                  <h6>@pepela</h6>
                </div>
                <button className={classes.follow}>Follow</button>
              </div>
            );
          })}

          <button onClick={() => setShow((state) => !state)}>Show more</button>
        </Row>
        
        <Row>
          <h4>Trends for You</h4>
          {people.map((person, index) => {
            return (
              <div key={index}>
                <Tag key={index + "vs"}>
                  {/* <div className={classes.avatar}>
                    <i className="fa fa-user"></i>
                  </div> */}
                  <div className="user">
                    <h5>#{person}</h5>
                    <h6>{600 * index + 3 } Tweets</h6>
                  </div>
                  {/* <button className={classes.follow}>Follow</button> */}
                </Tag>
                <Tag key={index}>
                  {/* <div className={classes.avatar}>
                    <i className="fa fa-user"></i>
                  </div> */}
                  <div className="user">
                    <h5>#{person}</h5>
                    <h6>600 Tweets</h6>
                  </div>
                  {/* <button className={classes.follow}>Follow</button> */}
                </Tag>
              </div>
            );
          })}
        </Row>
      </Contaier>
    </Wrap>
  );
};

export default RightBar;

const Row = styled.div`
  /* padding: 10px; */
  background: var(--borderLLight);
  margin: 10px 0;
  border-radius: 15px;
  > button {
    border: none;
    color: var(--primaryColor);
    background-color: transparent;
    cursor: pointer;
    margin: 5px 0 5px 15px;
  }
  > h4 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin: 5px 0;
    padding: 10px;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-child {
    border-bottom: none;
  }
`;
const Wrap = styled.div`
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  min-height: 400px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0 10px 10px;
  > form {
    width: 80%;
    position: relative;
    margin-bottom: 10px;
    input {
      width: 100%;
      padding-left: 30px;
      height: 40px;
      border-radius: 20px;
      border: none;
      outline: none;
      background: var(--borderLLight);
    }
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.5;
      color: black;
      left: 12px;
    }
  }
`;

const Contaier = styled.div`
  width: 80%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;
