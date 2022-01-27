import React from "react";

import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Input from "./input";

const makeSut = () => {
  const inputElement = screen.getByRole("textbox", {
    name: /textbox input/i,
  }) as HTMLInputElement;

  const inputStatus = screen.getByRole("status", {
    name: /status input/i,
  });

  return { inputElement, inputStatus };
};

describe("Input component", () => {
  it("Should be able to render status error if has errorMessage", () => {
    render(
      <Input name="email" aria-label="textbox input" errorMessage="required" />
    );

    const { inputElement, inputStatus } = makeSut();

    expect(inputElement).toHaveClass("statusError");
    expect(inputStatus).toHaveClass("statusError");
  });

  it("Should not be able to render status error if non existing errorMessage", () => {
    render(<Input name="email" aria-label="textbox input" />);

    const { inputElement, inputStatus } = makeSut();

    expect(inputElement).not.toHaveClass("statusError");
    expect(inputStatus).not.toHaveClass("statusError");
  });

  it("Should be able to initialize with value if pass value parameter", () => {
    render(
      <Input name="email" aria-label="textbox input" value="john@mail.com" />
    );

    const { inputElement } = makeSut();

    expect(inputElement.value).toBe("john@mail.com");
  });

  it("Should not be able to initialize with value if no pass value parameter", () => {
    render(<Input name="email" aria-label="textbox input" />);

    const { inputElement } = makeSut();

    expect(inputElement.value).toBe("");
  });

  it("Should be able return text when use onChange", () => {
    const setValue = jest.fn();

    render(
      <Input name="email" aria-label="textbox input" onChange={setValue} />
    );

    const { inputElement } = makeSut();

    userEvent.type(inputElement, "john@mail.com");

    expect(setValue).toBeCalledWith({
      fieldName: "email",
      value: "john@mail.com",
      element: inputElement,
    });
  });

  it("Should not be able return text when use onChange", () => {
    const setValue = jest.fn();

    render(<Input name="email" aria-label="textbox input" />);

    const { inputElement } = makeSut();

    userEvent.type(inputElement, "john@mail.com");

    expect(setValue).not.toBeCalledWith({
      fieldName: "email",
      value: "john@mail.com",
      element: inputElement,
    });
  });
});
