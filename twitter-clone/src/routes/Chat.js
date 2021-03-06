import React from "react";
import LeftBar from "./components/Home/Leftbar";

import OuterGrid from "./components/Layouts/InnerGrid";
import InnerGrid from "./components/Layouts/InnerGrid";
// import Feed from "../Feed/Feed";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Conversations from "./components/Messages/Conversations"
import Chat from "./components/Messages/Chats"

const useStyles = makeStyles((theme) => ({
  LeftBarContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  RightBarContainer: {
   
   
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <OuterGrid>
      <Grid
        item
        xs={0}
        sm={1}
        md={2}
        lg={3}
        position="static"
        className={classes.LeftBarContainer}
      >
        <LeftBar />
      </Grid>
      <Grid item xs={12} sm={11} md={10} lg={9}>
        <InnerGrid>
          <Grid item xs={0} md={4} sm={0}>
            <Conversations/>
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
            sm={12}
            position="static"
            className={classes.RightBarContainer}
          >
            <Chat/>
          </Grid>
        </InnerGrid>
      </Grid>
    </OuterGrid>
  );
};

export default Home;
