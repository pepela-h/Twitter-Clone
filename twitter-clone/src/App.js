import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Notifications from "./routes/Notifications";
import Profile from "./routes/Profile";
import Chat from "./routes/Chat";
import NotFound from "./routes/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/direct-message" element={<Chat />} />
            <Route path="/direct-message/:id" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
