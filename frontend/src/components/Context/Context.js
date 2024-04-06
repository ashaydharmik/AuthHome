import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";

import { useNavigate } from "react-router-dom";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(true);
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("user")) || { token: null };
  const userToken = auth.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  };

  const showLoginForm = () => {
    setShowRegister(false);
  };
  return (
    <AppContext.Provider
      value={{
        navigate,
        showLoginForm,
        showRegister,
        setShowRegister,
      }}
    >
      {children}

    
    </AppContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(AppContext);
};
export { AppContext, useGlobal, AppProvider };
