import React from "react";
import { render, screen } from "@testing-library/react";

import Input from "./input";

describe("Input component", () => {
  it("Should be able to render status error if has errorMessage", () => {
    render(<Input errorMessage="required" />);

    const inputStatus = screen.getByRole("status", {
      name: /input status/i,
    });

    expect(inputStatus).toHaveClass("statusError");
  });

  it("Should not be able to render status error if non existing errorMessage", () => {
    render(<Input />);

    const inputStatus = screen.getByRole("status", {
      name: /input status/i,
    });

    expect(inputStatus).not.toHaveClass("statusError");
  });
});
