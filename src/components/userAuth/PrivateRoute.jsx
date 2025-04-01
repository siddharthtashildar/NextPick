import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  return <div>{session ? <>{children}</> : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;