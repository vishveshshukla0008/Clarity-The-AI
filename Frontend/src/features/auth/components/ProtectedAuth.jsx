import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import AuthLoader from "./authLoader";

const ProtectedAuth = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <AuthLoader content={"Processing..."}/>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedAuth;
