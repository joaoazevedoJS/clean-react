import "reflect-metadata";

import faker from "@faker-js/faker";

import { RequiredFieldValidation } from "@/validation/validators";

import { RequiredFieldError } from "@/validation/errors";

type ISut = {
  validation: RequiredFieldValidation;
};

const makeSut = (): ISut => {
  const validation = new RequiredFieldValidation(faker.database.column());

  return {
    validation,
  };
};

describe("RequiredField", () => {
  test("Should return error if field is empty", () => {
    const { validation } = makeSut();

    const error = validation.validate("");

    expect(error).toBeInstanceOf(RequiredFieldError);
  });

  test("Should return falsy if field is not empty", () => {
    const { validation } = makeSut();

    const error = validation.validate(faker.random.words());

    expect(error).toBeFalsy();
  });
});
