import "reflect-metadata";

import faker from "@faker-js/faker";

import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";

type ISut = {
  minLengthValidation: MinLengthValidation;
};

const makeSUT = (minLength: number): ISut => {
  const minLengthValidation = new MinLengthValidation(
    faker.database.column(),
    minLength
  );

  return { minLengthValidation };
};

describe("MinLengthValidation", () => {
  test("should return error if value is invalid", () => {
    const { minLengthValidation } = makeSUT(5);

    const error = minLengthValidation.validate("abc");

    expect(error).toBeInstanceOf(InvalidFieldError);
  });
});
