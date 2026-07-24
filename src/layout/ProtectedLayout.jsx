import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Auth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { currentUser } = useContext(Auth);

  if (!currentUser) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
