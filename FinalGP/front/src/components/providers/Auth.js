import React, { useEffect, useState, useContext } from "react";

const globalState = {
  user: null,
  token: null
};
export const AuthContext = React.createContext(globalState);

export const AuthProvider = () => {
 
  return (
    <AuthContext.Provider value={currentUser, setCurrentUser}>
     
    </AuthContext.Provider>
  );
};
