import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Leftbar = () => {
  const [selected, setSelected] = useState(0);
  const tabs = [
    {
      icon: "fal fa-home-alt",
      text: "Home",
    },
    {
      icon: "fal fa-search",
      text: "Explore",
    },
    {
      icon: "fal fa-inbox",
      text: "Messages",
    },
    {
      icon: "fal fa-bookmark",
      text: "Saved",
    },
    {
      icon: "fal fa-list-alt",
      text: "Lists",
    },
    {
      icon: "fal fa-user-alt",
      text: "Profile",
    },
    {
      icon: "fal fa-ellipsis-h",
      text: "More Options",
    },
  ];

  const handleTabs = (i) => {
    setSelected(i);
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {}, []);
  return (
    <Wrap className={"Leftbars"}>
      <div className="head">
        <Link to="/">
          <i className="fab fa-twitter"></i>
        </Link>
      </div>
      {tabs.map((tab, i) => {
        const color = selected === i ? "var(--primaryColor)" : "inherit";
        return (
          <Row key={i} color={color} onClick={() => handleTabs(i)}>
            <i className={`icon fal ${tab.icon}`}></i>
            <h5>{tab.text}</h5>
          </Row>
        );
      })}

      <button>Tweet</button>

      {user?.username ? (
        <div className="bottom">
          <div className="avatar">
            {user.avatar ? (
              <img src={user.avatar} alt="" />
            ) : (
              <i className="fa fa-user"></i>
            )}
          </div>
          <div>
            <h5>{user.name}</h5>
            <p>@{user.username}</p>
          </div>
        </div>
      ) : (
        <div className="bottom">
          <div className="avatar">
            <i className="fa fa-user"></i>
          </div>
          <Link to="/auth">
            <h6>
              Login <i className="fa fa-sign-in"></i>
            </h6>
          </Link>
        </div>
      )}
    </Wrap>
  );
};

export default Leftbar;

const Wrap = styled.div`
  height: 100vh;
  min-height: 400px;
  position: sticky;
  border: 1px solid;
  border-color: var(--borderLight);

  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bottom {
    margin-top: auto;
    margin-bottom: 15px;
    width: 80%;
    display: flex;
    align-items: center;
    a {
      color: var(--primaryColor);
    }
    p {
      font-size: var(--textFont-ssm);
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
    }
    .avatar {
      img {
        width: 100%;
      }
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--borderLight);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-right: 15px;
      i {
        color: grey;
        font-size: 35px;
        transform: translateY(10%);
      }
    }
  }
  .head {
    display: flex;
    align-items: center;
    font-size: 22px;
    padding: 15px 0;
    width: 150px;

    i {
      margin-right: auto !important;
      color: var(--primaryColor);
      font-size: var(--textFont-xxlg);
    }
  }
  button {
    border: none;
    width: 70%;
    height: 40px;
    border-radius: 400px;
    background-color: var(--primaryColor);
    margin-top: 50px;
    cursor: pointer;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: flex-end;
  cursor: pointer;
  padding: 15px 0;
  width: 150px;
  flex-shrink: 0;
  color: ${(props) => props.color}; /* margin-left: auto; */
  h5 {
    min-width: 120px;
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
  .fa-ellipsis-h {
    border-radius: 50%;
    border: 1px solid;
    border-color: ${(props) => props.color};
    flex-shrink: 0;
  }
  .icon {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    font-size: var(--textFont-xlg);
  }
`;
