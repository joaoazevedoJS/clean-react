import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import faker from "@faker-js/faker";

import { ValidationSpy } from "@/presentation/test";

import Login from "./login";

type SutTypes = {
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();

  validationSpy.errorMessage = faker.random.words();

  return {
    validationSpy,
  };
};

describe("Login component", () => {
  it("Should render form status empty on start ", () => {
    const { validationSpy } = makeSut();

    render(<Login validation={validationSpy} />);

    const errorWrap = screen.getByRole("contentinfo", {
      name: /error wrap/i,
    });

    expect(errorWrap.childElementCount).toBe(0);
  });

  it("Should start login with button disabled", () => {
    const { validationSpy } = makeSut();

    render(<Login validation={validationSpy} />);

    const submitButton = screen.getByRole("button", {
      name: /entrar/i,
    });

    expect(submitButton).toBeDisabled();
  });

  it("Should call Validation with correct email", () => {
    const { validationSpy } = makeSut();

    render(<Login validation={validationSpy} />);

    const emailElement = screen.getByTestId("email");

    const email = faker.internet.email();

    userEvent.type(emailElement, email);

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(email);
  });

  it("Should call Validation with correct password", () => {
    const { validationSpy } = makeSut();

    render(<Login validation={validationSpy} />);

    const passwordElement = screen.getByTestId("password");

    const password = faker.internet.password();

    userEvent.type(passwordElement, password);

    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(password);
  });

  it("Should show email message error if Validation fails", () => {
    const { validationSpy } = makeSut();

    const errorMessage = faker.random.words();

    validationSpy.errorMessage = errorMessage;

    render(<Login validation={validationSpy} />);

    const emailElement = screen.getByTestId("email");
    const emailStatusElement = screen.getByTestId("email-status");

    userEvent.type(emailElement, faker.internet.email());

    expect(emailStatusElement.title).toBe(errorMessage);
    expect(emailStatusElement.classList).toContain("statusError");
  });

  it("Should show password message error if Validation fails", () => {
    const { validationSpy } = makeSut();

    const errorMessage = faker.random.words();

    validationSpy.errorMessage = errorMessage;

    render(<Login validation={validationSpy} />);

    const passwordElement = screen.getByTestId("password");
    const passwordStatusElement = screen.getByTestId("password-status");

    userEvent.type(passwordElement, faker.internet.password());

    expect(passwordStatusElement.title).toBe(errorMessage);
    expect(passwordStatusElement.classList).toContain("statusError");
  });
});
