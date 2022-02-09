import React from "react";

import "jest-localstorage-mock";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

describe("Login component", () => {
  let validation: ValidationSpy;
  let authentication: AuthenticationSpy;

  beforeEach(() => {
    const { validationSpy, authenticationSpy } = makeSut();

    render(
      <Login validation={validationSpy} authentication={authenticationSpy} />
    );

    validation = validationSpy;
    authentication = authenticationSpy;
  });

  it("Should render form status empty on start ", () => {
    const { errorWrap } = useForm();

    expect(errorWrap.childElementCount).toBe(0);
  });

  it("Should call Validation with correct email", () => {
    const email = faker.internet.email();

    useEmailElement(email);

    expect(validation.fieldName).toBe("email");
    expect(validation.fieldValue).toBe(email);
  });

  it("Should call Validation with correct password", () => {
    const password = faker.internet.password();

    usePasswordElement(password);

    expect(validation.fieldName).toBe("password");
    expect(validation.fieldValue).toBe(password);
  });

  it("Should not show email message error if Validation is valid", () => {
    const { emailStatusElement } = useEmailElement();

    expect(emailStatusElement.title).not.toBe(faker.random.words());
    expect(emailStatusElement.classList).not.toContain("statusError");
  });

  it("Should not show password message error if Validation is valid", () => {
    const { passwordStatusElement } = usePasswordElement();

    expect(passwordStatusElement.title).not.toBe(faker.random.words());
    expect(passwordStatusElement.classList).not.toContain("statusError");
  });

  it("Should enable submit button if form is valid", () => {
    const { submitButton } = useForm();

    usePasswordElement();
    useEmailElement();

    expect(submitButton).not.toBeDisabled();
  });

  it("Should show spinner on submit", () => {
    usePasswordElement();
    useEmailElement();

    const { spinner } = useForm(true);

    expect(spinner).toBeInTheDocument();
  });

  it("Should call Authentication with correct values", () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    useEmailElement(email);
    usePasswordElement(password);

    useForm(true);

    expect(authentication.params).toEqual({
      email,
      password,
    });
  });

  it("Should call Authentication only once", () => {
    useEmailElement();
    usePasswordElement();

    useForm(true);
    useForm(true);

    expect(authentication.callsCount).toBe(1);
  });

  it("Should present error if Authentication fails", async () => {
    const error = new InvalidCredentialsError();

    jest
      .spyOn(authentication, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    const { spinner } = useForm(true);

    await waitFor(() => authentication.callsCount);

    const mainError = screen.queryByRole("alert", { name: /error message/i });

    expect(spinner).not.toBeInTheDocument();
    expect(mainError.textContent).toBe(error.message);
  });

  it("Should add accessToken to localstorage on sucess", async () => {
    useEmailElement();
    usePasswordElement();
    useForm(true);

    await waitFor(() => authentication.callsCount);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      authentication.account.accessToken
    );
  });
});

describe("Login component With validationError", () => {
  let validation: ValidationSpy;
  let authentication: AuthenticationSpy;

  beforeEach(() => {
    const { validationSpy, authenticationSpy } = makeSut(faker.random.words());

    render(
      <Login validation={validationSpy} authentication={authenticationSpy} />
    );

    validation = validationSpy;
    authentication = authenticationSpy;
  });

  it("Should start login with button disabled", () => {
    const { submitButton } = useForm();

    expect(submitButton).toBeDisabled();
  });

  it("Should show email message error if Validation fails", () => {
    const { emailStatusElement } = useEmailElement();

    expect(emailStatusElement.title).toBe(validation.errorMessage);
    expect(emailStatusElement.classList).toContain("statusError");
  });

  it("Should show password message error if Validation fails", () => {
    const { passwordStatusElement } = usePasswordElement();

    expect(passwordStatusElement.title).toBe(validation.errorMessage);
    expect(passwordStatusElement.classList).toContain("statusError");
  });

  it("Should not call Authentication if is invalid", () => {
    useForm(true);

    expect(authentication.callsCount).toBe(0);
  });
});
