import "reflect-metadata";

import faker from "@faker-js/faker";
import { InvalidFieldError } from "@/validation/errors";

import { EmailValidation } from "./email-validation";

type ISut = {
  emailValidation: EmailValidation;
};

const makeSUT = (): ISut => {
  const emailValidation = new EmailValidation("email");

  return {
    emailValidation,
  };
};

describe("EmailValidation", () => {
  test("Should return error if email is invalid", () => {
    const { emailValidation } = makeSUT();

    const error = emailValidation.validate(faker.random.word());

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  test("Should return falsy if email is valid", () => {
    const { emailValidation } = makeSUT();

    const error = emailValidation.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});
