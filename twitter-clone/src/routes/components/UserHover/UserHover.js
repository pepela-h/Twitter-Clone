import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchProfile } from "../../../api";
import imge from "../../../images/2.jpg";
const UserHover = ({ username, show }) => {
  const [profile, setProfile] = useState({});
  var stay = show;

  useEffect(() => {
    const getProfile = async () => {
      if (show) {
        const data = await fetchProfile(username);

        setProfile(data);
      }
    };
    getProfile();
  }, [show, username]);
  return (
    <Wrap
      onMouseOver={() => {
        stay = true;
      }}
      style={{
        display: stay ? "flex" : "none",
      }}
    >
      <div className="Top">
        <div className="Left">
          <div className="avatar">
            <img src={profile.avatar || imge} alt="" />
          </div>
          <span className="name">{profile?.name}</span>
          <span className="username">@{profile?.username}</span>
        </div>
        <button>Follow</button>
      </div>
      <p className="desc">{profile.bio}</p>
      <div className="users">
        <p>
          {profile?.following?.length} <span> Following</span>
        </p>
        <p>
          {profile?.followers?.length} <span>Followers</span>
        </p>
      </div>
    </Wrap>
  );
};

export default UserHover;

const Wrap = styled.div`
  display: none;
  flex-direction: column;
  background-color: white;
  border: 1.5px solid var(--borderLight);
  width: 250px;
  padding: 10px;
  border-radius: 15px;
  position: absolute;
  bottom: -150px;
  z-index: 100;
  right: -100px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  .Top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    > button {
      background: transparent;
      border-radius: 50px;
      border: 2px solid;
      border-color: var(--borderLight);
      min-width: 100px;
      height: 30px;
      margin-left: auto;
      cursor: pointer;
    }
    .Left {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      > span {
        font-size: var(--textFont-ssm);
        &:nth-child(3) {
          font-size: var(--textFont-xssm);
          text-decoration: underline;
        }
      }
      .avatar {
        background-color: hotpink;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;

        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
  p {
    font-size: var(--textFont-sm);
    margin-bottom: 5px;
    width: 85%;
  }
  .users {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--textFont-sm);
    font-weight: 600;
    p {
      cursor: pointer;
    }
    span {
      opacity: 0.65;
    }
  }
`;
