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
    render(<Input errorMessage="required" />);

    const { inputElement, inputStatus } = makeSut();

    expect(inputElement).toHaveClass("statusError");
    expect(inputStatus).toHaveClass("statusError");
  });

  it("Should not be able to render status error if non existing errorMessage", () => {
    render(<Input />);

    const { inputElement, inputStatus } = makeSut();

    expect(inputElement).not.toHaveClass("statusError");
    expect(inputStatus).not.toHaveClass("statusError");
  });

  it("Should be able to initialize with value if pass value parameter", () => {
    render(<Input value="john@mail.com" />);

    const { inputElement } = makeSut();

    expect(inputElement.value).toBe("john@mail.com");
  });

  it("Should not be able to initialize with value if no pass value parameter", () => {
    render(<Input />);

    const { inputElement } = makeSut();

    expect(inputElement.value).toBe("");
  });

  it("Should be able return text when use onChange", () => {
    const setValue = jest.fn();

    render(<Input onChange={setValue} />);

    const { inputElement } = makeSut();

    userEvent.type(inputElement, "john@mail.com");

    expect(setValue).toBeCalledWith("john@mail.com");
  });

  it("Should not be able return text when use onChange", () => {
    const setValue = jest.fn();

    render(<Input />);

    const { inputElement } = makeSut();

    userEvent.type(inputElement, "john@mail.com");

    expect(setValue).not.toBeCalledWith("john@mail.com");
  });
});
