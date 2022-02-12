import "reflect-metadata";

import faker from "@faker-js/faker";

import {
  RequiredFieldValidation,
  ValidationBuilder,
} from "@/validation/validators";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const field = faker.database.column();

    const validations = ValidationBuilder.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });
});
