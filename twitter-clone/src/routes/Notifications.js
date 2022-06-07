import React, { useEffect, useState } from "react";
import HomeLayout from "./components/Layouts/HomeLayout";
import styled from "styled-components";
import { getNotifs } from "../api";
import { useSelector } from "react-redux";
const Explore = () => {
  const tabs = ["All", "Mentions"];
  const [selected, setSelected] = useState(0);
  const [notifications, setNotifications] = useState([]);
  // const nots = ["one", "two", "three"];
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getNotifications = async () => {
      const data = await getNotifs()
      setNotifications(data)
    }

    getNotifications()
  },[])
  return (
    <HomeLayout>
      <Wrap>
        <Wrapper>
          <h6>Notifications</h6>
          <i className="fal fa-cog"></i>
        </Wrapper>

        <Scrollable>
          <Tabs>
            {tabs.map((tab, i) => (
              <P
                key={i}
                selected={selected === i}
                onClick={() => setSelected(i)}
              >
                {tab}
              </P>
            ))}
          </Tabs>

          {notifications.map((n, i) => {
            const dateFormat = n.nDate.split("T")
            let date = dateFormat[0].replaceAll("-", "/") 
            const time = dateFormat[1].split(".")[0]

            
            return (
              <Notifications key={i}>
                <i className="fab fa-twitter"></i>
                <div>
                  <p>
                    {n.nType === "login" ? `There was a login to your account  @${user.username} on ${date} at ${time} `:""}
                  </p>
                </div>
              </Notifications>
            );
          })}
        </Scrollable>
      </Wrap>
    </HomeLayout>
  );
};

export default Explore;
const Notifications = styled.div`
  padding: 8px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  i {
    font-size: 28px;
    color: var(--primaryColor);
    margin-right: 10px;
  }
  div {
    flex: 1;
    display: flex;
    align-items: center;
    p {
      font-size: var(--textFont-sm);
      width: 80%;
    }
  }
`;

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
  padding: 13px 0;
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${(props) =>
    props.selected ? "rgba(0,0,0,0.05)" : "white"};
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
    display: ${(props) => (props.selected ? "flex" : "none")};
  }
`;

const Wrapper = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: var(--texFont-lg);
  justify-content: space-between;
  h6 {
    font-size: var(--texFont-md);
    cursor: pointer;
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
