import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { followUser } from "../../../api";
import bgImage from "../../../images/bg.jpg";
import Tweets from "./Tweets";

const Trends = ({ profile, setProfile }) => {
  const user = useSelector((state) => state.user);

  const tabs = ["Tweets", "Tweets and replies", "Media", "kes"];
  const [selected, setSelected] = useState(0);

  const [hasFollowed, setHasFollowed] = useState(
    false
  );
  useEffect(() => {
    setHasFollowed(profile?.followers?.indexOf(user._id) !== -1);
  }, [profile?.followers, user._id]);
  // console.log(hasFollowed);

  const handleFollow = async () => {
    setHasFollowed((state) => !state);
    const data = await followUser(user._id, profile._id);
    // console.log(data)
    setProfile(data);
    setHasFollowed(profile?.followers?.indexOf(user._id) !== -1);
  };

  return (
    <Wrap>
      <Top>
        <img src={bgImage} alt="" />
      </Top>
      <Profile>
        <div className="avatar">
         {  profile?.avatar ? <img src={profile.avatar} alt="" /> : <i className="fa fa-user"></i>}
        </div>
        <button onClick={ profile?.username !== user.username ? handleFollow:undefined} >
          {profile?.username === user.username
            ? " Set up Profile "
            : hasFollowed
            ? "Followed"
            : "Follow"}
        </button>
      </Profile>
      <User>
        <h6>{profile?.name}</h6>
        <p>{profile?.username}</p>
        <p>
          <i className="fal fa-calendar"></i> Joined May 2022
        </p>
        <div>
          <p>
            {profile?.following?.length} <span> following</span>
          </p>
          <p>
            {profile?.followers?.length} <span> followers</span>
          </p>
        </div>
      </User>

      <Tabs>
        {tabs.map((tab, i) => (
          <P key={i} selected={selected === i} onClick={() => setSelected(i)}>
            {tab}
          </P>
        ))}
      </Tabs>
      <Tweets></Tweets>
    </Wrap>
  );
};

export default Trends;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  p {
  }
`;

const P = styled.p`
  font-size: var(--textFont-sm);
  padding: 5px 0;
  position: relative;
  cursor: pointer;
  &:after {
    position: absolute;
    height: 2px;
    width: 100%;
    background: var(--primaryColor);
    content: "";
    bottom: 0;
    left: 0;
    border-radius: 100px;
    display: ${(props) => (props.selected ? "block" : "none")};
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--textFont-sm);
  padding: 0 15px;
  margin: 8px 0;
  > p {
    opacity: 0.6;
    margin: 2px 0;
  }
  > h6 {
    margin: 2px 0;
    font-size: var(--textFont-md);
  }
  > div {
    margin: 2px 0;
    display: flex;
    p {
      margin-right: 10px;
      font-weight: 600;
      span {
        opacity: 0.6;
        font-weight: 300;
      }
    }
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  position: relative;
  width: 100%;
  height: 50px;

  button {
    margin-left: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    width: 100px;
    background: transparent;
    border-radius: 20px;
    border: none;
    outline: 1px solid var(--borderLight);
  }
  .avatar {
    position: absolute;
    top: 0;
    left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    transform: translateY(-50%);
    background-color: aliceblue;
    outline: 3px solid black;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    i {
      font-size: 80px;
      transform: translateY(20%);
      color: grey;
    }
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  height: 30vh;
  min-height: 200px;
  position: relative;
  > div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: var(--textFont-sm);
    }

    span {
      opacity: 0.8;
      font-weight: 300;
    }
    color: white;
  }
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: 100%;
  }
`;
