import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ValidationSpy } from "@/presentation/test";

import Login from "./login";

type SutTypes = {
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();

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

    userEvent.type(emailElement, "john@mail.com");

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe("john@mail.com");
  });

  it("Should call Validation with correct password", () => {
    const { validationSpy } = makeSut();

    render(<Login validation={validationSpy} />);

    const passwordElement = screen.getByTestId("password");

    userEvent.type(passwordElement, "@A12345678");

    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe("@A12345678");
  });
});
