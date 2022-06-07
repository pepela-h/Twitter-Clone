import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { getTags } from "../../../api";
import bgImage from "../../../images/bg.jpg";
import Tweets from "../Profile/Tweets";
import { CircularProgress } from "@mui/material";
const Trends = () => {
  // const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const tabs = ["Top", "Latest", "People", "Photos", "Videos"];
  const location = useLocation();
  // const [searchparams]= useSearchParams();
  // console.log(Object.fromEntries([searchparams]))

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(0);
  // console.log(location);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getTrending = async () => {
      const data = await getTags(null, setLoading);
      setTags(data);
    };
    if (location.pathname === "/explore") {
      getTrending();
    }
  }, [location.pathname]);

  // const useQuery = () => {
  //   return new URLSearchParams(location.search)
  // }

  // const query = useQuery()
  // const parameters = query.get("q")
 


  return (
    <Wrap>
      {location.pathname === "/explore" ? (
        <>
          {" "}
          <Top>
            <img src={bgImage} alt="" />
            <div>
              <h6>
                Television . <span>LIVE</span>
              </h6>
              <p>Young, African and famous</p>
            </div>
          </Top>
          <PersonalTrends>
            <h3>Trends for You</h3>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              tags?.map((tag, i) => (
                <Row
                  key={i}
                  onClick={() => {
                    navigate(`/search?q=${tag.name}`);
                  }}
                >
                  <div>
                    <p>Trending around you</p>
                    <h6>{tag.name}</h6>
                    <p>{tag?.posts?.length} Tweets</p>
                  </div>
                  <i className="fa fa-ellipsis-h"></i>
                </Row>
              ))
            )}
          </PersonalTrends>
        </>
      ) : (
        <>
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
          <Tweets parameters={location.hash} />
        </>
      )}
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
  padding: 12px 0;

  position: relative;
  cursor: pointer;
  &:after {
    position: absolute;
    height: 4px;
    width: 100%;
    /* min-width:50px; */
    background: var(--primaryColor);
    content: "";
    bottom: 0;
    left: 0;
    border-radius: 100px;
    display: ${(props) => (props.selected ? "block" : "none")};
  }
`;

const PersonalTrends = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid var(--borderLight);
  border-top: 1px solid var(--borderLight);
  h3 {
    font-size: var(--textFont-lg);
    padding: 10px 15px;
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
const Row = styled.div`
  display: flex;
  cursor: pointer;

  margin: 3px 0;
  padding: 5px 15px;

  &:hover {
    background: rgba(250, 250, 250, 0.99);
  }
  i {
    font-weight: 400;
    cursor: pointer;
  }
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: column;
  }
  p {
    opacity: 0.8;
    font-size: var(--textFont-ssm);
    margin: 0;
  }
  h6 {
    margin: 2px 0;
    font-size: var(--textFont-sm);
  }
`;
