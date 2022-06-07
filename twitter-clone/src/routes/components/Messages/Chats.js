import React from "react";
import styled from "styled-components";
const Chats = () => {
  return (
    <Wrap>
      <Wrapper>
        <div>
          <div className="avatar">
            <i className="fa fa-user"></i>
          </div>

          <div className="userMS">
            <h6>Dave Gray</h6>
            <p>@username</p>
          </div>
        </div>
        <i className="fal fa-info"></i>
      </Wrapper>
    </Wrap>
  );
};

export default Chats;
const Wrap = styled.div`
  border-right: 1px solid;
  border-color: var(--borderLight);
  overflow: hidden;
  min-height: 100vh;
  height: 100vh;
`;
const Wrapper = styled.div`
  /* border-bottom: 1px solid; */
  border-color: var(--borderLight);
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: var(--texFont-lg);
  justify-content: space-between;
  .avatar {
    width: 25px;
    height: 25px;
    i {
      font-size: 20px;
    }
  }
  .userMS {
    flex-direction: column;
    display: flex;
    margin-left: 5px;
    h6 {
      font-size: var(--textFont-sm);
    }
    p {
      font-size: var(--textFont-ssm);
    }
  }
  > div {
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    i {
      margin: 0 3px;
    }
  }
  h6 {
    font-size: var(--texFont-md);
    cursor: pointer;
  }
`;
