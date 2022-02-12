import "reflect-metadata";

import faker from "@faker-js/faker";

import { FieldValidation } from "@/validation/protocols/field-validation";

import { ValidationComposite } from "./validation-composite";

import { FieldValidationSpy } from "@/validation/validators/test/mock-field-validation";

type ISut = {
  validationComposite: ValidationComposite;
};

const makeSUT = (validators: FieldValidation[]): ISut => {
  const validationComposite = new ValidationComposite(validators);

  return {
    validationComposite,
  };
};

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const field = faker.database.column();
    const errorMessage = faker.random.words();

    const fieldValidationSpy = new FieldValidationSpy(field);
    const fieldValidationSpy2 = new FieldValidationSpy(field);

    fieldValidationSpy2.error = new Error(errorMessage);

    const { validationComposite } = makeSUT([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);

    const error = validationComposite.validate({
      fieldName: field,
      fieldValue: faker.random.word(),
    });

    expect(error).toBe(errorMessage);
  });
});
