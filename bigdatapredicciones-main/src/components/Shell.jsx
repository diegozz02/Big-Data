import React from "react";
import { Navigate, Route } from "react-router-dom";

function Shell() {
    const usuarioLogueado = sessionStorage.getItem('usuario');
    if (!usuarioLogueado) {
      return <Navigate to="/" />;
    }
}

export default Shell;
