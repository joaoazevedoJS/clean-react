import "reflect-metadata";

import faker from "@faker-js/faker";

import {
  RequiredFieldValidation,
  ValidationBuilder,
  EmailValidation,
} from "@/validation/validators";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const field = faker.database.column();

    const validations = ValidationBuilder.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test("Should return EmailValidation", () => {
    const field = faker.database.column();

    const validations = ValidationBuilder.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });
});
