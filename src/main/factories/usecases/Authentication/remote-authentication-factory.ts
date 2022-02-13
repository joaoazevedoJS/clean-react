import { Authentication } from "@/domain/usecases";

import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";

import { makeAxiosHttpClient, makeAPIUrl } from "@/main/factories/http";

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeAPIUrl("/login"), makeAxiosHttpClient());
};
