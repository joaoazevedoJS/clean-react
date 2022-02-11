import "reflect-metadata";

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

    const error = emailValidation.validate("");

    expect(error).toBeInstanceOf(InvalidFieldError);
  });
});
