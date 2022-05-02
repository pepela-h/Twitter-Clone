import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import bgImage from "../../../../images/1.jpg";
const Post = ({ image, description }) => {

  return (
    <Wrap>
      <Left>
        <div className="avatar">
          <i className="fa fa-user"></i>
        </div>
      </Left>
      <Right>
        <div className="top">
          <h6>Pepela John </h6>

          <Link to="/">@pepelamwenyewe.</Link>
          <p>15m</p>
        </div>
        <Description>
          {description && (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              eos qui necessitatibus cupiditate fugit omnis. Nemo et libero
              assumenda quia.
            </p>
          )}
        </Description>
        {image && image !== "" && (
          <Image>
            <img src={`../../../../images/${image}`} alt="" />
          </Image>
        )}
        <div className="toolBar">
          <i className="fal fa-comment">
            <span>2</span>
          </i>
          <i className="fal fa-retweet">
            <span>34</span>
          </i>
          <i className="fal fa-heart">
            <span>56</span>
          </i>
          <i className="fal fa-share-alt"></i>
        </div>
      </Right>
    </Wrap>
  );
};

export default Post;

const Wrap = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);

  display: flex;
  align-items: flex-start;
  padding: 15px;
`;

const Left = styled.div`
  /* display:flex; */
  height: 100%;
  flex: 0.08;
  > .avatar {
    background: var(--borderLight);
    flex: 0.08;
    height: 50px !important;
    width: 50px !important;
    border-radius: 50% !important;
    /* padding: 2px; */
    display: flex;
    /* flex-grow: 0; */
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: auto;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  .toolBar {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 5px 0 5px;
    justify-content: space-between;
    i {
      cursor: pointer;
      font-size: var(--textfont-md);
      span {
        margin-left: 5px;
        font-size: var(--textFont-xsm);
      }
    }
  }
  .top {
    display: flex;
    a,
    p {
      font-size: var(--textFont-ssm);
    }
    a {
      font-weight: bold;
      margin: 0 3px;
      text-decoration: underline;
    }
  }
`;
const Image = styled.div`
  min-height: 200px;
  border-radius: 15px;
  margin-top: 10px;
  display: grid;
  max-height: 450px;
  object-fit: contain;
  object-position: center;

  overflow: hidden;
  img {
    width: 100%;
  }
`;

const Description = styled.div`
  width: 90%;
  margin: 3px 0;
  p {
    font-size: var(--textFont-sm);
  }
`;
