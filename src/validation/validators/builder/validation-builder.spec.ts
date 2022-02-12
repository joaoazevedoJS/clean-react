import "reflect-metadata";

import faker from "@faker-js/faker";

import {
  RequiredFieldValidation,
  ValidationBuilder,
  EmailValidation,
  MinLengthValidation,
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

  test("Should return MinLengthlValidation", () => {
    const field = faker.database.column();
    const length = faker.datatype.number();

    const validations = ValidationBuilder.field(field).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test("Should return a list of validations", () => {
    const field = faker.database.column();
    const length = faker.datatype.number();

    const validations = ValidationBuilder.field(field)
      .required()
      .min(length)
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
