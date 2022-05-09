import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Notifications from "./routes/Notifications";
import Profile from "./routes/Profile";
import Chat from "./routes/Chat";
import NotFound from "./routes/NotFound";
import Auth from "./routes/Auth";
import Login from "./routes/Auth/Signin";
import SignUp from "./routes/Auth/Signup";
import UserHover from "./routes/components/UserHover/UserHover";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import { loadingContext as LoadingContext } from "./state/loadingContext";
import { useSelector } from "react-redux";
import UserRefresh from "./User";
import { refreshToken } from "./api";
function App() {
  const [loading, setIsloading] = React.useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const Refresher = new UserRefresh(user._id);
    if (user.username) {
      Refresher.refreshUserToken();
      setInterval(() => {
        refreshToken(user._id);
      }, 1000 * 60 * 5);
    }

    return () => clearInterval();
  }, [user]);
  return (
    <>
      <LoadingContext.Provider value={(loading, setIsloading)}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/direct-message" element={<Chat />} />
              <Route path="/direct-message/:id" element={<Chat />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/i/flow/login" element={<Login />} />
              <Route path="/i/flow/signup" element={<SignUp />} />
              <Route path="*" element={<UserHover />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </LoadingContext.Provider>
    </>
  );
}

export default App;
