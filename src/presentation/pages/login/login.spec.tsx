import React from "react";
import { render, screen } from "@testing-library/react";

import Login from "./login";

describe("Login component", () => {
  it("Should render form status empty on start ", () => {
    render(<Login />);

    const errorWrap = screen.getByRole("contentinfo", {
      name: /error wrap/i,
    });

    expect(errorWrap.childElementCount).toBe(0);
  });

  it("Should start login with button disabled", () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", {
      name: /entrar/i,
    });

    expect(submitButton).toBeDisabled();
  });
});
