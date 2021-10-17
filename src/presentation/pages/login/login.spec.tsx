import React from "react";
import { render, screen } from "@testing-library/react";

import Login from "./login";

describe("Login component", () => {
  test("Should not render spinner and error on start", () => {
    render(<Login />);

    const errorWrap = screen.getByRole("contentinfo", {
      name: /error wrap/i,
    });

    expect(errorWrap.childElementCount).toBe(0);
  });
});
