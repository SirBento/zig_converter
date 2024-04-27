import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userData } from "../../helpers";

const ProtectedRoutes = () => {
  let { token, role } = userData();
  let auth = { 'token': token };
  
  return (
    <React.Fragment>
      {auth.token && role !== 1 ? <Outlet /> : <Navigate to="/login" />}
    </React.Fragment>
  );
}

export default ProtectedRoutes;