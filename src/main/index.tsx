import React from "react";
import ReactDOM from "react-dom";

import Router from "@/presentation/router/router";

import { MakeLogin } from "@/main/factories/pages/login/login-factory";

ReactDOM.render(
  <Router MakeLogin={MakeLogin} />,
  document.getElementById("main")
);
