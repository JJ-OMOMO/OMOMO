import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./service/auth_service";

const authService = new AuthService();
ReactDOM.render(
  <BrowserRouter>
    <App authService={authService} />
  </BrowserRouter>,
  document.getElementById("root")
);
