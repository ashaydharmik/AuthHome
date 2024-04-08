import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";

import { useNavigate } from "react-router-dom";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(true);
  const navigate = useNavigate();
 

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
