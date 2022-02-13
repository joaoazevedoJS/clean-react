import React, { FC } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@/presentation/styles/global.scss";

import { MakeLogin } from "@/main/factories/pages/login/login-factory";
import { NotFound } from "@/presentation/pages";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<MakeLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
