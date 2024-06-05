 
// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoutes = ({ user, Permission }) => {
//   //user物件內的permission為 permission : ["User"]
//   //Account 頁面  permission 僅有 Admin 能訪問
//   //Dashboard 頁面  permission User 和 Admin 都能訪問
  
//   return user.login &&
//     user.permission.find((per) => Permission.includes(per)) ? (
//     <Outlet />
//   ) : (
//     <Navigate to={"/"} />
    
//   );
// };

// export default ProtectedRoutes;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user }) => {
  // if (user.login)
  // {
  //   alert("log in successfully!");
  // }
  // else{
  //   alert("log in failed ! retry again !");
  // }
  return user.login ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;