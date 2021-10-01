import "reflect-metadata";

import faker from "faker";

import { HttpPostClientSpy } from "../../mock/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

import { mockAuthentication } from "../../../domain/mock/mock-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();

  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpClient with correct body", async () => {
    const authParams = mockAuthentication();

    const { sut, httpPostClientSpy } = makeSut();

    await sut.auth(authParams);

    expect(httpPostClientSpy.body).toEqual(authParams);
  });
});
