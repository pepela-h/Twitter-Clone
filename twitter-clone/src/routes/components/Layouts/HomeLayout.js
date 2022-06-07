import React from "react";
import LeftBar from "../Home/Leftbar";
import RightBar from "../Home/RightBar";
import OuterGrid from "../Layouts/OuterGrid";
import InnerGrid from "../Layouts/InnerGrid";
// import Feed from "../Feed/Feed";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  LeftBarContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none", 
    },
  },
  RightBarContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const Home = ({ children }) => {
  const classes = useStyles();
  return (
    <OuterGrid>
      <Grid item xs={0} sm={1} md={2} lg={3} position="static" className={classes.LeftBarContainer}>
        <LeftBar />
      </Grid>
      <Grid item xs={12} sm={11} md={10} lg={9}>
        <InnerGrid>
          <Grid item  xs={12} md={7} >
            {children}
          </Grid>
          <Grid
            item
            md={5}
            xs={0}
            sm={0}
            position="static"
            className={classes.RightBarContainer}
          >
            <RightBar />
            <div></div>
          </Grid>
        </InnerGrid>
      </Grid>
    </OuterGrid>
  );
};

export default Home;
