import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SignInPage from "./components/SigninPage";
import { UserContext } from "./contexts/UserContext";
import Home from "./components/Home";

function App() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={isLoggedIn ? <Home /> : <SignInPage/> }
        />
        <Route
          exact
          path="/"
          element={isLoggedIn ? <Home /> : <SignInPage/>}
        />
          <Route
          exact
          path="/home"
          element={<Home/>}
        />
        
        
        
      </Routes>
    </Router>
  );
}

export default App;
