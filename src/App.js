import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme.js';

import SignInPage from "./components/SigninPage";
import { UserContext } from "./contexts/UserContext";
import Home from "./components/Home";



function App() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
