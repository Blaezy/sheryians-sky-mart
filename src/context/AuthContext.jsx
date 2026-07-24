import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(JSON.parse(localStorage.getItem("registeredUsers")) || []);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  return (
    <Auth.Provider value={{ registeredUser, setRegisteredUser, currentUser, setCurrentUser }}>{children}</Auth.Provider>
  );
};
