import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTags } from "../../../api";
// import { borderColor } from "@mui/system";
import { CircularProgress } from "@mui/material";
import useStyles from "./styles";
const RightBar = () => {
  const classes = useStyles();
  const location = useLocation();
  // eslint-disable-next-line
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const people = ["Pepela John"];
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getTrends = async () => {
      setLoading(true)
      const data = await getTags(10, setLoading);
      setTags(data);
    };

    if (location.pathname !== "/explore") {
      getTrends();
    }
  }, [location.pathname]);
  return (
    <Wrap className={classes.rightBar}>
      <form>
        <input type="text" />
        <i className="fa fa-search"></i>
      </form>
      <Contaier className="container">
        {location.pathname === "/explore" ? (
          <Row>
            <h4>Maybe you may like</h4>
            {loading ? (
              <div className={classes.loadingState}>
                <CircularProgress color="primary" />
              </div>
            ) : (
              people.map((person, index) => {
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
              })
            )}

            {/* <button onClick={() => setShow((state) => !state)}>
              Show more
            </button> */}
          </Row>
        ) : (
          <Row>
            <h4>Trends for You</h4>
            {loading ? (
              <div className={classes.loadingState}>
                <CircularProgress color="primary" />
              </div>
            ) : (
              tags?.length &&
              tags?.map((tag, index) => {
                return (
                  <Tag key={index + "vs"}>
                    <div className="user">
                      <h5>{tag.name}</h5>
                      <h6>{tag.posts.length} Tweets</h6>
                    </div>
                  </Tag>
                );
              })
            )}
            {/* <Link to="/explore">
              {" "}
              <button>Show More</button>
            </Link> */}
          </Row>
        )}
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
   button {
    border: none;
    color: var(--primaryColor);
    background-color: transparent;
    cursor: pointer;
    margin: 5px 0 5px 15px;
  }
  > h4 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.0811);
    margin: 5px 0;
    padding: 10px;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.081);
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
