import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Notifications from "./routes/Notifications";
import Profile from "./routes/Profile";
import Chat from "./routes/Chat";
import NotFound from "./routes/NotFound";
import Auth from "./routes/Auth";
import Login from "./routes/Auth/Signin";
import SignUp from "./routes/Auth/Signup";
import Logout from "./routes/Logout";
import SideNav from "./routes/components/SideNav/SideNav";

const CustomRoutes = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  React.useEffect(() => {
    window.addEventListener("keydown", (event) => {
     
      if (event.key === "Tab") {
      
        toggleDrawer("left", true);
      }
    });

    return () => {
      window.removeEventListener("keydown", (event) => {
         if (event.key === "Alt") {
          console.log("Alt")
           toggleDrawer("left", true);
         }
      });
    };
    // eslint-disable-next-line
  }, []);

  const toggleDrawer = (anchor, open) =>  {
  

    setState({ ...state, [anchor]: open });
  };
  return (
    <React.Fragment>
      <SideNav toggleDrawer={toggleDrawer} state={state}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Explore />} />
        <Route path="/direct-message" element={<Chat />} />
        <Route path="/direct-message/:id" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/i/flow/login" element={<Login />} />
        <Route path="/i/flow/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/:username" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default CustomRoutes;
