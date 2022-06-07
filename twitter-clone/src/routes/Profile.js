import React, { useEffect, useState } from "react";
import HomeLayout from "./components/Layouts/HomeLayout";
import styled from "styled-components";
import Profile from "./components/Profile/Profile";
import { useNavigate, useParams } from "react-router";
// import { useDispatch } from "react-redux";

import { fetchProfile } from "../api";
const Explore = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = params.username;
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getUserProfile = async (user) => {
      const data = await fetchProfile(user, navigate);
      setProfile(data);
    };
    getUserProfile(user);

    //eslint-disable-next-line
  }, [navigate, user]);
  return (
    <HomeLayout>
      <Wrap>
        <Wrapper>
          <div>
            <h6>{profile?.name}</h6>
            <span>4 tweets</span>
          </div>
        </Wrapper>

        <Scrollable>
          <Profile setProfile={setProfile} profile={profile} />
        </Scrollable>
      </Wrap>
    </HomeLayout>
  );
};

export default Explore;

const Wrapper = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: var(--textFont-lg);
  justify-content: space-between;

  > div {
    display: flex;
    font-size: var(--textFont-sm);
    /* align-items: center; */
    flex-direction:column;
    span {
      font-size: var(--textFont-ssm)!important;
    }
    h6 {
      font-size: var(--textFont-sm);
    }
  }
  h6 {
    font-size: var(--textFont-sm);
    cursor: pointer;
    margin-right: 2px;
  }
`;

const Wrap = styled.div`
  border-right: 1px solid;
  border-color: var(--borderLight);
  overflow: hidden;
  min-height: 100vh;
`;

const Scrollable = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 40px);
  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background: var(--borderLight);
    border-radius: 200px;
  }
`;
