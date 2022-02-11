import "reflect-metadata";

import faker from "@faker-js/faker";

import { RequiredFieldValidation } from "./required-field-validation";

import { RequiredFieldError } from "@/validation/errors";

describe("RequiredField", () => {
  test("Should return error if field is empty", () => {
    const sut = new RequiredFieldValidation("email");

    const error = sut.validate("");

    expect(error).toBeInstanceOf(RequiredFieldError);
  });

  test("Should return falsy if field is not empty", () => {
    const sut = new RequiredFieldValidation("email");

    const error = sut.validate(faker.random.words());

    expect(error).toBeFalsy();
  });
});
