import "reflect-metadata";

import { RequiredFieldValidation } from "./required-field-validation";

import { RequiredFieldError } from "@/validation/errors";

describe("RequiredField", () => {
  test("Should return error if field is empty", () => {
    const sut = new RequiredFieldValidation("email");

    const error = sut.validate("");

    expect(error).toBeInstanceOf(RequiredFieldError);
  });
});
