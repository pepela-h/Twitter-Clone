import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import CustomRoutes from "./Routes"
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import { loadingContext as LoadingContext } from "./state/loadingContext";
import { useSelector } from "react-redux";

import { refreshToken } from "./api";
function App() {
  // const location = window.location;
  const [loading, setIsloading] = React.useState(false);
  const user = useSelector((state) => state.user);


  useEffect(() => {
    const getToken = async () => {
      await refreshToken(user._id);
    };
    if (user.username) {
      getToken(user._id);
      window.timeout = setInterval(() => {
        getToken(user._id);
      }, 1000 * 60 * 5);
    }

    return () => clearInterval(window.timeout);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <LoadingContext.Provider value={(loading, setIsloading)}>
        <ThemeProvider theme={theme}>
          <Router>
            <CustomRoutes/>
          </Router>
        </ThemeProvider>
      </LoadingContext.Provider>
    </>
  );
}

export default App;
