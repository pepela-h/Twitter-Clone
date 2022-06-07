import React, { useEffect, useState } from "react";
import HomeLayout from "./components/Layouts/HomeLayout";
import styled from "styled-components";
import Trends from "./components/Trends/Trends";
import { useLocation } from "react-router";
const Explore = () => {
  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const parameters = query.get("q");


  const [formData, setFormData] = useState("");

  useEffect(() => {
    if (location.hash.length) {
      setFormData(location.hash);
    } else if (parameters?.length) {
      setFormData(parameters);
    }
  }, [location.hash,parameters]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e)
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value)
  }

  return (
    <HomeLayout>
      <Wrap>
        <Wrapper>
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <input
              type="text"
              placeholder="Search Twitter..."
              value={formData}
              onChange={(e) => {
               handleChange(e);
              }}
            />
            <i className="fal fa-search"></i>
          </form>
          <i className="fal fa-cog" style={{ cursor: "pointer" }}></i>
        </Wrapper>

        <Scrollable>
          <Trends></Trends>
        </Scrollable>
      </Wrap>
    </HomeLayout>
  );
};

export default Explore;

const Wrapper = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: var(--texFont-lg);
  justify-content: space-between;
  position: relative;
  top: 0 !important;
  form {
    width: 80%;
    height: 80%;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
    input {
      width: 100%;
      height: 100%;
      border-radius: 150px;
      padding: 0 35px;
      border: none !important;
      outline: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
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
