import React from "react";
// import { Navigate, Route } from "react-router-dom";
import Shell from "../components/Shell";
import MTablas from "../components/MTablas";


export default function Home() {
    const navigateToLogin = Shell();
    if (navigateToLogin) {
        return navigateToLogin;
    }
  return (
    <>
    {/* <div> */}
      <MTablas/>
    {/* </div> */}
    </>
  );
}

