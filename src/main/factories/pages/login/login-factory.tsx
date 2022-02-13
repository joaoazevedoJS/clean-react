import React, { FC, useMemo } from "react";

import { Login } from "@/presentation/pages";

import { makeRemoteAuthentication } from "@/main/factories/usecases/Authentication/remote-authentication-factory";

import { MakeLoginValidation } from "./login-validation-factory";

const MakeLogin: FC = () => {
  const remoteAuthentication = useMemo(() => makeRemoteAuthentication(), []);
  const validationComposite = useMemo(() => MakeLoginValidation(), []);

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};

export { MakeLogin };
