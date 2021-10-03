import "reflect-metadata";
import faker from "faker";

import { HttpPostClientSpy } from "@/data/mock/mock-http-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

import { mockAuthentication } from "@/domain/mock/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/Invalid-credentials-error";

import { RemoteAuthentication } from "./remote-authentication";

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
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const authParams = mockAuthentication();

    const { sut, httpPostClientSpy } = makeSut();

    await sut.auth(authParams);

    expect(httpPostClientSpy.body).toEqual(authParams);
  });

  test("Should throw invalidCredentialsError if HttpPostClient returns status 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
