import "reflect-metadata";

import faker from "@faker-js/faker";

import { FieldValidationSpy } from "@/validation/validators/test/mock-field-validation";

import { ValidationComposite } from "@/validation/validators";

type ISut = {
  validationComposite: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSUT = (field: string): ISut => {
  const fieldValidationSpy = new FieldValidationSpy(field);
  const fieldValidationSpy2 = new FieldValidationSpy(field);

  const fieldValidationsSpy = [fieldValidationSpy, fieldValidationSpy2];

  const validationComposite = new ValidationComposite(fieldValidationsSpy);

  return {
    validationComposite,
    fieldValidationsSpy,
  };
};

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const field = faker.database.column();
    const errorMessage = faker.random.words();

    const { validationComposite, fieldValidationsSpy } = makeSUT(field);

    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());

    const error = validationComposite.validate({
      fieldName: field,
      fieldValue: faker.random.word(),
    });

    expect(error).toBe(errorMessage);
  });

  test("Should not return error if all validation is valid", () => {
    const field = faker.database.column();

    const { validationComposite } = makeSUT(field);

    const error = validationComposite.validate({
      fieldName: field,
      fieldValue: faker.random.word(),
    });

    expect(error).toBeFalsy();
  });
});
