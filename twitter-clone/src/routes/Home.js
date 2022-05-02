import React from "react";
import LeftBar from "./components/Home/Leftbar";
import RightBar from "./components/Home/RightBar";
import OuterGrid from "./components/Layouts/OuterGrid";
import InnerGrid from "./components/Layouts/InnerGrid";
import Feed from "./components/Feed/Feed";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <OuterGrid>
      <Grid item sm={2.4} position="static">
        <LeftBar />
      </Grid>
      <Grid item sm={9.6}>
        <InnerGrid>
          <Grid item sm={7.5}>
            <Feed></Feed>
          </Grid>
          <Grid item sm={4.5} position="static">
            <RightBar />
            <div></div>
          </Grid>
        </InnerGrid>
      </Grid>
    </OuterGrid>
  );
};

export default Home;