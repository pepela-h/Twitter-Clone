import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

const Leftbar = () => {
  const location = useLocation();

  const navigate = useNavigate();
const user = useSelector((state) => state.user);

  


  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget );
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  const tabs = [
    {
      icon: "fal fa-home-alt",
      text: "Home",
      path: "/",
    },
    {
      icon: "fal fa-search",
      text: "Explore",
      path: "/explore",
    },
    {
      icon: "fal fa-bell",
      text: "Notifications",
      path: "/notifications",
    },
    {
      icon: "fal fa-inbox",
      text: "Messages",
      path: "/direct-message",
    },
    {
      icon: "fal fa-bookmark",
      text: "Saved",
      path: "/saved",
    },
    {
      icon: "fal fa-list-alt",
      text: "Lists",
      path: "/lists",
    },
    {
      icon: "fal fa-user-alt",
      text: "Profile",
      path: `/${user.username}`,
    },
  ];

  useEffect(() => {}, []);
  return (
    <Wrap className={"Leftbars"}>
      <div className="head">
        <Link to="/">
          <i className="fab fa-twitter"></i>
        </Link>
      </div>
      {tabs.map((tab, i) => {
        const color =
          location.pathname === tab.path ? "var(--primaryColor)" : "inherit";
        return (
          <Row key={i} color={color}>
            <Link
              to={tab.text === "Profile" && !user.username ? "/" : tab.path}
            >
              <i className={`icon fal ${tab.icon}`}></i>
              <h5>{tab.text}</h5>
            </Link>
          </Row>
        );
      })}

      <Row>
        <i className={`icon fal fa-ellipsis-h`}></i>
        <h5>{"More Options"}</h5>
      </Row>

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
          <div className="userCred">
            <h5>{user.name}</h5>
            <p>@{user.username}</p>
          </div>

          <div className="alrght">
            <i
              className="fa fa-ellipsis-h"
              aria-describedby={id}
              type="button"
              onClick={handleClick}
            ></i>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement={"top-end"}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                    <div className="mContainer">
                      <div className="btm">
                        <div className="avtr">
                          {user.avatar ? (
                            <img src={user.avatar} alt="" />
                          ) : (
                            <i className="fa fa-user"></i>
                          )}
                        </div>
                        <div>
                          <h6>Pepela John</h6>
                          <p>@pepelajohn</p>
                        </div>
                        <div className="alrght">
                          <i className="fa fa-check colorP"></i>
                        </div>
                      </div>
                      <div className="btm">
                        <h4>Add an existing account</h4>
                      </div>

                      <div className="btm">
                        <h4
                        style={{cursor:"pointer"}}
                          onClick={()=>{navigate("/logout")}}
                        >{`Logout @${user.username}`}</h4>
                      </div>
                    </div>
                  </Box>
                </Fade>
              )}
            </Popper>
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
  @media screen and (max-width: 1200px) {
    justify-content: center !important;
    /* width:fit-content; */
  }

  .top{
    display:flex !important;
  }

  .userCred {
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  .bottom,.btm {
    margin-top: auto;
    margin-bottom: 15px;
    width: 80%;
    display: flex !important;
    align-items: center;
    .alrght {
      margin-left: auto;
    }
    @media screen and (max-width: 1200px) {
      width: 100%;
      align-items: center;
      justify-content: center;
    }
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

    @media screen and (max-width: 1200px) {
      text-align: center;
      width: 100%;
      display: flex;
      justify-content: center;
    }

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

    @media screen and (max-width: 1200px) {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
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
  color: ${(props) => props.color};

  @media screen and (max-width: 1200px) {
    justify-content: center;
    width: 100%;
    h5 {
      display: none !important;
    }
  }
  a {
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  /* margin-left: auto; */
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

    @media screen and (max-width: 1200px) {
      margin-right: 0;
    }
  }
`;
