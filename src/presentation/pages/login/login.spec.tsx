import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import faker from "@faker-js/faker";

import { AuthenticationSpy, ValidationSpy } from "@/presentation/test";

import Login from "./login";

type SutTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  return {
    validationSpy,
    authenticationSpy,
  };
};

describe("Login component", () => {
  let validation: ValidationSpy;
  let authentication: AuthenticationSpy;

  let errorWrap: HTMLElement;
  let submitButton: HTMLElement;
  let spinner: HTMLElement;

  let emailElement: HTMLInputElement;
  let emailStatusElement: HTMLElement;

  let passwordElement: HTMLInputElement;
  let passwordStatusElement: HTMLElement;

  beforeEach(() => {
    const { validationSpy, authenticationSpy } = makeSut();

    render(
      <Login validation={validationSpy} authentication={authenticationSpy} />
    );

    validation = validationSpy;
    authentication = authenticationSpy;

    errorWrap = screen.getByRole("contentinfo", { name: /error wrap/i });
    submitButton = screen.getByRole("button", { name: /entrar/i });
    spinner = screen.queryByRole("status", { name: /spinner loading/i });

    emailElement = screen.getByTestId("email");
    emailStatusElement = screen.getByTestId("email-status");

    passwordElement = screen.getByTestId("password");
    passwordStatusElement = screen.getByTestId("password-status");
  });

  it("Should render form status empty on start ", () => {
    expect(errorWrap.childElementCount).toBe(0);
  });

  it("Should call Validation with correct email", () => {
    const email = faker.internet.email();

    userEvent.type(emailElement, email);

    expect(validation.fieldName).toBe("email");
    expect(validation.fieldValue).toBe(email);
  });

  it("Should call Validation with correct password", () => {
    const password = faker.internet.password();

    userEvent.type(passwordElement, password);

    expect(validation.fieldName).toBe("password");
    expect(validation.fieldValue).toBe(password);
  });

  it("Should not show email message error if Validation is valid", () => {
    userEvent.type(emailElement, faker.internet.email());

    expect(emailStatusElement.title).not.toBe(faker.random.words());
    expect(emailStatusElement.classList).not.toContain("statusError");
  });

  it("Should not show password message error if Validation is valid", () => {
    userEvent.type(passwordElement, faker.internet.password());

    expect(passwordStatusElement.title).not.toBe(faker.random.words());
    expect(passwordStatusElement.classList).not.toContain("statusError");
  });

  it("Should enable submit button if form is valid", () => {
    userEvent.type(passwordElement, faker.internet.password());
    userEvent.type(emailElement, faker.internet.email());

    expect(submitButton).not.toBeDisabled();
  });

  it("Should show spinner on submit", () => {
    userEvent.type(passwordElement, faker.internet.password());
    userEvent.type(emailElement, faker.internet.email());
    userEvent.click(submitButton);

    spinner = screen.queryByRole("status", { name: /spinner loading/i });

    expect(spinner).toBeInTheDocument();
  });

  it("Should call Authentication with correct values", () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    userEvent.type(emailElement, email);
    userEvent.type(passwordElement, password);

    userEvent.click(submitButton);

    expect(authentication.params).toEqual({
      email,
      password,
    });
  });
});

describe("Login component With validationError", () => {
  let validation: ValidationSpy;

  let submitButton: HTMLElement;

  let emailElement: HTMLInputElement;
  let emailStatusElement: HTMLElement;

  let passwordElement: HTMLInputElement;
  let passwordStatusElement: HTMLElement;

  beforeEach(() => {
    const { validationSpy, authenticationSpy } = makeSut();

    validationSpy.errorMessage = faker.random.words();

    render(
      <Login validation={validationSpy} authentication={authenticationSpy} />
    );

    validation = validationSpy;

    submitButton = screen.getByRole("button", { name: /entrar/i });

    emailElement = screen.getByTestId("email");
    emailStatusElement = screen.getByTestId("email-status");

    passwordElement = screen.getByTestId("password");
    passwordStatusElement = screen.getByTestId("password-status");
  });

  it("Should start login with button disabled", () => {
    expect(submitButton).toBeDisabled();
  });

  it("Should show email message error if Validation fails", () => {
    userEvent.type(emailElement, faker.internet.email());

    expect(emailStatusElement.title).toBe(validation.errorMessage);
    expect(emailStatusElement.classList).toContain("statusError");
  });

  it("Should show password message error if Validation fails", () => {
    userEvent.type(passwordElement, faker.internet.password());

    expect(passwordStatusElement.title).toBe(validation.errorMessage);
    expect(passwordStatusElement.classList).toContain("statusError");
  });
});
