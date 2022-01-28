import React from "react";
import { mocked } from "ts-jest/utils";
import { render, screen } from "@testing-library/react";

import {
  useFormContext,
  FormContextPropsMocked,
} from "@/presentation/contexts/form/form-context";

import FormStatus from "./form-status";

jest.mock("@/presentation/contexts/form/form-context");

function useFormContextMocked({
  isLoading,
  errorMessage,
}: FormContextPropsMocked) {
  const contextMocked = mocked(useFormContext);

  contextMocked.mockReturnValueOnce({
    isLoading: !!isLoading,
    errorMessage: errorMessage || "",
    email: "",
    password: "",
  });
}

describe("Form status component", () => {
  it("should not be able to render spinner load when not has loading", () => {
    useFormContextMocked({});

    render(<FormStatus />);

    const spinner = screen.queryByRole("status", {
      name: /spinner loading/i,
    });

    expect(spinner).not.toBeInTheDocument();
  });

  it("should be able to render spinner load when has loading", () => {
    useFormContextMocked({
      isLoading: true,
    });

    render(<FormStatus />);

    const spinner = screen.getByRole("status", {
      name: /spinner loading/i,
    });

    expect(spinner).toBeInTheDocument();
  });

  it("should not be able to render error message when has empty message", () => {
    useFormContextMocked({});

    render(<FormStatus />);

    const spinner = screen.queryByRole("alert", {
      name: /error message/i,
    });

    expect(spinner).not.toBeInTheDocument();
  });

  it("should be able to render error message when has message", () => {
    useFormContextMocked({
      errorMessage: "error message mocked",
    });

    render(<FormStatus />);

    const spinner = screen.getByRole("alert", {
      name: /error message/i,
    });

    expect(spinner).toBeInTheDocument();
  });
});
