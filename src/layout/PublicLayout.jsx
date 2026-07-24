import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Auth } from "../context/AuthContext";

const PublicLayout = () => {
  const { currentUser } = useContext(Auth);

  if (currentUser) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
