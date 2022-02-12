import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "@/presentation/styles/global.scss";

type Props = {
  MakeLogin: FC;
};

const Router: FC<Props> = ({ MakeLogin }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={MakeLogin} />
    </Switch>
  </BrowserRouter>
);

export default Router;
