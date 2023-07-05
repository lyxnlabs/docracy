import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SignInPage from "./components/SigninPage";
import { UserContext } from "./contexts/UserContext";
import Home from "./components/Home";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define your theme
const theme = createTheme({
  // Add your theme configuration here
});
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
