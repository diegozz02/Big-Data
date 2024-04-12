import React from "react";
// import { Navigate, Route } from "react-router-dom";
import Shell from "../components/Shell";
import STemp from "../components/STemp";


export default function Graphics() {
    const navigateToLogin = Shell();
    if (navigateToLogin) {
        return navigateToLogin;
    }
  return (
    <>
    {/* <div> */}
      <STemp/>
    {/* </div> */}
    </>
  );
}

