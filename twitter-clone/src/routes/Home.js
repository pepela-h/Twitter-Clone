import React from "react";
import Feed from "./components/Feed/Feed";

import HomeLayout from "./components/Layouts/HomeLayout";

const Home = () => {
  // const classes = useStyles();

 
  return (
    <HomeLayout>
      <Feed />
    </HomeLayout>
  );
};

export default Home;
