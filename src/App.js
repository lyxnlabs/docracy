import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SignInPage from './components/SigninPage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
