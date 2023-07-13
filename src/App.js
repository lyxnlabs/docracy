import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme.js";

import SignInPage from "./components/SigninPage";
import { UserContext } from "./contexts/UserContext";
import Home from "./components/Home";
import Footer from "./components/Footer.jsx";

function App() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Router>
          <Routes>
            <Route
              exact
              path="/login"
              element={isLoggedIn ? <Home /> : <SignInPage />}
            />
            <Route
              exact
              path="/"
              element={isLoggedIn ? <Home /> : <SignInPage />}
            />

            <Route exact path="/home" element={<Home />} />
          </Routes>
        </Router>
        <footer style={{ marginTop: "auto" }}>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
