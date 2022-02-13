import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "jest-localstorage-mock";

import faker from "@faker-js/faker";

import { AuthenticationSpy, ValidationSpy } from "@/presentation/test";
import { InvalidCredentialsError } from "@/domain/errors";

import Login from "./login";

type SutTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (validationError?: string): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  localStorage.clear();

  if (validationError) {
    validationSpy.errorMessage = validationError;
  }

  render(
    <Router navigator={history} location={history.location}>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>
  );

  return {
    validationSpy,
    authenticationSpy,
  };
};

const useEmailElement = (value = faker.internet.email()) => {
  const emailElement: HTMLInputElement = screen.getByTestId("email");
  const emailStatusElement = screen.getByTestId("email-status");

  userEvent.type(emailElement, value);

  return {
    emailElement,
    emailStatusElement,
  };
};

const usePasswordElement = (value = faker.internet.password()) => {
  const passwordElement: HTMLInputElement = screen.getByTestId("password");
  const passwordStatusElement = screen.getByTestId("password-status");

  userEvent.type(passwordElement, value);

  return {
    passwordElement,
    passwordStatusElement,
  };
};

const useForm = (submit = false) => {
  const submitButton = screen.getByRole("button", { name: /entrar/i });

  if (submit) {
    userEvent.click(submitButton);
  }

  const spinner = screen.queryByRole("status", { name: /spinner loading/i });
  const errorWrap = screen.getByRole("contentinfo", { name: /error wrap/i });

  return {
    errorWrap,
    submitButton,
    spinner,
  };
};

const history = createMemoryHistory({ initialEntries: ["/login"] });

describe("Login component", () => {
  it("Should render form status empty on start ", () => {
    makeSut();

    const { errorWrap } = useForm();

    expect(errorWrap.childElementCount).toBe(0);
  });

  it("Should call Validation with correct email", () => {
    const { validationSpy } = makeSut();

    const email = faker.internet.email();

    useEmailElement(email);

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(email);
  });

  it("Should call Validation with correct password", () => {
    const { validationSpy } = makeSut();

    const password = faker.internet.password();

    usePasswordElement(password);

    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(password);
  });

  it("Should not show email message error if Validation is valid", () => {
    makeSut();

    const { emailStatusElement } = useEmailElement();

    expect(emailStatusElement.title).not.toBe(faker.random.words());
    expect(emailStatusElement.classList).not.toContain("statusError");
  });

  it("Should not show password message error if Validation is valid", () => {
    makeSut();

    const { passwordStatusElement } = usePasswordElement();

    expect(passwordStatusElement.title).not.toBe(faker.random.words());
    expect(passwordStatusElement.classList).not.toContain("statusError");
  });

  it("Should enable submit button if form is valid", () => {
    makeSut();

    const { submitButton } = useForm();

    usePasswordElement();
    useEmailElement();

    expect(submitButton).not.toBeDisabled();
  });

  it("Should show spinner on submit", () => {
    makeSut();
    usePasswordElement();
    useEmailElement();

    const { spinner } = useForm(true);

    expect(spinner).toBeInTheDocument();
  });

  it("Should call Authentication with correct values", () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    useEmailElement(email);
    usePasswordElement(password);

    useForm(true);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it("Should start login with button disabled", () => {
    makeSut(faker.random.words());

    const { submitButton } = useForm();

    expect(submitButton).toBeDisabled();
  });

  it("Should show email message error if Validation fails", () => {
    const { validationSpy } = makeSut(faker.random.words());
    const { emailStatusElement } = useEmailElement();

    expect(emailStatusElement.title).toBe(validationSpy.errorMessage);
    expect(emailStatusElement.classList).toContain("statusError");
  });

  it("Should show password message error if Validation fails", () => {
    const { validationSpy } = makeSut(faker.random.words());

    const { passwordStatusElement } = usePasswordElement();

    expect(passwordStatusElement.title).toBe(validationSpy.errorMessage);
    expect(passwordStatusElement.classList).toContain("statusError");
  });

  it("Should not call Authentication if is invalid", () => {
    const { authenticationSpy } = makeSut(faker.random.words());

    useForm(true);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it("Should call Authentication only once", () => {
    const { authenticationSpy } = makeSut();

    useEmailElement();
    usePasswordElement();

    useForm(true);
    useForm(true);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it("Should present error if Authentication fails", async () => {
    const { authenticationSpy } = makeSut();

    const error = new InvalidCredentialsError();

    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    const { spinner } = useForm(true);

    await waitFor(() => authenticationSpy.callsCount);

    const mainError = screen.queryByRole("alert", { name: /error message/i });

    expect(spinner).not.toBeInTheDocument();
    expect(mainError.textContent).toBe(error.message);
  });

  it("Should add accessToken to localstorage on sucess", async () => {
    const { authenticationSpy } = makeSut();

    useEmailElement();
    usePasswordElement();
    useForm(true);

    await waitFor(() => authenticationSpy.callsCount);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      authenticationSpy.account.accessToken
    );

    expect(history.location.pathname).toBe("/");
  });

  it("Should go to signup page", () => {
    makeSut();

    const registerLink = screen.getByRole("link", { name: /registe account/i });

    userEvent.click(registerLink);

    expect(history.location.pathname).toBe("/signup");
  });
});
