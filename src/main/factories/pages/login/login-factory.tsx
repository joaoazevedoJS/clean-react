import React, { FC, useMemo } from "react";

import { Login } from "@/presentation/pages";

import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client";

import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";

export const MakeLogin: FC = () => {
  const remoteAuthentication = useMemo(() => {
    const url = "http://fordevs.herokuapp.com/api/login";
    const axiosHttpClient = new AxiosHttpClient();

    return new RemoteAuthentication(url, axiosHttpClient);
  }, []);

  const validationComposite = useMemo(() => {
    return ValidationComposite.build([
      ...ValidationBuilder.field("email").required().email().build(),
      ...ValidationBuilder.field("password").required().build(),
    ]);
  }, []);

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};
