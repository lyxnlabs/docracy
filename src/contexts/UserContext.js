import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
    // Additional login logic, such as storing user data in local storage or cookies, can be performed here.
  };

  const logout = () => {
    setLoggedIn(false);
    // Additional logout logic, such as clearing user data from local storage or cookies, can be performed here.
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
